const onboardingService = require('../services/onboarding.service');

// Personal
const getPersonal = async (req, res) => {
  try {
    const { patientId } = req.params;
    const response = await onboardingService.getPersonal(patientId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const savePersonal = async (req, res) => {
  try {
    const { patientId } = req.params;
    const payload = req.body;
    await onboardingService.savePersonal(patientId, payload);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Medical
const getMedical = async (req, res) => {
  try {
    const { patientId } = req.params;
    const response = await onboardingService.getMedical(patientId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const saveMedical = async (req, res) => {
  try {
    const { patientId } = req.params;
    const payload = req.body;
    await onboardingService.saveMedical(patientId, payload);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Insurance
const getInsurance = async (req, res) => {
  try {
    const { patientId } = req.params;
    const response = await onboardingService.getInsurance(patientId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const saveInsurance = async (req, res) => {
  try {
    const { patientId } = req.params;
    const payload = req.body;
    await onboardingService.saveInsurance(patientId, payload);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPersonal,
  savePersonal,
  getMedical,
  saveMedical,
  getInsurance,
  saveInsurance
};
