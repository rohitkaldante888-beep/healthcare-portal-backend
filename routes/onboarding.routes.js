const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/onboarding.controller');

// ✅ Only PATIENT can access onboarding
router.use(auth(['PATIENT']));

// Step 1 – Personal
router.get('/personal/:patientId', controller.getPersonal);
router.post('/personal/:patientId', controller.savePersonal);

// Step 2 – Medical
router.get('/medical/:patientId', controller.getMedical);
router.post('/medical/:patientId', controller.saveMedical);

// Step 3 – Insurance
router.get('/insurance/:patientId', controller.getInsurance);
router.post('/insurance/:patientId', controller.saveInsurance);

module.exports = router;
