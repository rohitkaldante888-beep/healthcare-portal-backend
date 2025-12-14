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

  // get onboarding status (for patients)
  let onboardingStatus = null;
  if (user.role === 'PATIENT') {
    const { data: patient } = await supabase
      .from('patients')
      .select('status, last_step_completed')
      .eq('user_id', user.id)
      .single();

    onboardingStatus =
      patient.status === 'completed'
        ? 'completed'
        : `step${patient.last_step_completed + 1}`;
  }

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      onboardingStatus,
    },
  };
};


const signUp = async ({ email, password }) => {
  // 1. Check existing user
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

  // 4. Create patient profile
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .insert([
      {
        user_id: user.id,
        status: 'draft',
        last_step_completed: 0
      }
    ])
    .select()
    .single();

  if (patientError) throw patientError;

  // 5. Generate JWT
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  return {
    token,
    role: user.role,
    patientId: patient.id,
    onboardingStatus: 'step1'
  };
};




module.exports = { signIn, signUp };





