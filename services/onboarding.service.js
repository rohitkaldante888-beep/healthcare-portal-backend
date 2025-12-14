const supabase = require('../config/db');

exports.getPersonal = async (patientId) => {
  const { data } = await supabase
    .from('onboarding_personal')
    .select('*')
    .eq('patient_id', patientId)
    .single();
  return data;
};

exports.savePersonal = async (patientId, payload) => {
  const { error } = await supabase
    .from('onboarding_personal')
    .upsert({
      patient_id: patientId,
      ...payload,
    });

  if (error) throw error;
};

exports.getMedical = async (patientId) => {
  const { data } = await supabase
    .from('onboarding_medical')
    .select('*')
    .eq('patient_id', patientId)
    .single();
  return data;
};

exports.saveMedical = async (patientId, payload) => {
  const { error } = await supabase
    .from('onboarding_medical')
    .upsert({
      patient_id: patientId,
      ...payload,
    });

  if (error) throw error;
};

exports.getInsurance = async (patientId) => {
  const { data } = await supabase
    .from('onboarding_insurance')
    .select('*')
    .eq('patient_id', patientId)
    .single();
  return data;
};

exports.saveInsurance = async (patientId, payload) => {
  const { error } = await supabase
    .from('onboarding_insurance')
    .upsert({
      patient_id: patientId,
      ...payload,
    });

  if (error) throw error;

  // Mark patient onboarding complete
  await supabase
    .from('patients')
    .update({ status: 'completed' })
    .eq('id', patientId);
};
