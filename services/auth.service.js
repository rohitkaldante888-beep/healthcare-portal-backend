const supabase = require('../config/db.js');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken.js');


const signIn = async ({ email, password }) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  // get onboarding status
  const { data: patient } = await supabase
    .from('patients')
    .select('status, last_step_completed')
    .eq('user_id', user.id)
    .single();

  return {
    token,
    role: user.role,
    onboardingStatus:
      patient.status === 'completed'
        ? 'completed'
        : `step${patient.last_step_completed + 1}`
  };
};


const signUp = async ({ email, password }) => {
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data: user, error } = await supabase
    .from('users')
    .insert([
      {
        email,
        password_hash: passwordHash,
        role: 'PATIENT'
      }
    ])
    .select()
    .single();

  if (error) throw error;

  await supabase.from('patients').insert([
    {
      user_id: user.id,
      status: 'draft',
      last_step_completed: 0
    }
  ]);

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    role: user.role,
    onboardingStatus: 'step1'
  };
};



module.exports = { signIn, signUp };





