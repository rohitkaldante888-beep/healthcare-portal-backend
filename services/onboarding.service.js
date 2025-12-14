const supabase = require('../config/db');

exports.getPersonal = async (patientId) => {
  const { data, error } = await supabase
    .from('onboarding_personal')
    .select('*')
    .eq('patient_id', patientId)
    .maybeSingle(); 

  if (error) throw error;
  return data;
};

exports.savePersonal = async (patientId, payload) => {
  const { data, error } = await supabase
    .from('onboarding_personal')
    .upsert(
      {
        patient_id: patientId,
        ...payload
      },
      {
        onConflict: 'patient_id', // ✅ IMPORTANT
        returning: 'representation'
      }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

exports.getMedical = async (patientId) => {
  const { data, error } = await supabase
    .from('onboarding_medical')
    .select('*')
    .eq('patient_id', patientId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

exports.saveMedical = async (patientId, payload) => {
  const { data, error } = await supabase
    .from('onboarding_medical')
    .upsert(
      {
        patient_id: patientId,
        ...payload
      },
      {
        onConflict: 'patient_id',
        returning: 'representation'
      }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

exports.getInsurance = async (patientId) => {
  const { data, error } = await supabase
    .from('onboarding_insurance')
    .select('*')
    .eq('patient_id', patientId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

exports.saveInsurance = async (patientId, payload) => {
  const { data, error } = await supabase
    .from('onboarding_insurance')
    .upsert(
      {
        patient_id: patientId,
        ...payload
      },
      {
        onConflict: 'patient_id',
        returning: 'representation'
      }
    )
    .select()
    .single();

  if (error) throw error;

  // ✅ mark onboarding complete
  await supabase
    .from('patients')
    .update({ status: 'completed' })
    .eq('id', patientId);

  return data;
};
