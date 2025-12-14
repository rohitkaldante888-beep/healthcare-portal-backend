const onboardingService = require('../services/onboarding.service');


const getPersonal = async (req, res) => {
    try{
        const response = await onboardingService.getPersonal();
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


const savePersonal = async (req, res) => {
    try{
        const response = await onboardingService.savePersonal(req.body);
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


const getMedical = async (req, res) => {
    try{
        const response = await onboardingService.getMedical();
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


const saveMedical = async (req, res) => {
    try{
        const response = await onboardingService.saveMedical(req.body);
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


const getInsurance = async (req, res) => {
    try{
        const response = await onboardingService.getInsurance();
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}



const saveInsurance = async (req, res) => {
    try{
        const response = await onboardingService.saveInsurance(req.body);
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}



module.exports = { getPersonal, savePersonal, getMedical, saveMedical, getInsurance, saveInsurance };