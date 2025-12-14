const authService = require('../services/auth.service');

const signUp = async (req, res) => {
    try {
        const response = await authService.signUp(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};




const signIn = async (req,res) =>{
    try{
        const response = await authService.signIn(req.body);
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { signUp,signIn };