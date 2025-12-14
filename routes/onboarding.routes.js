const router = require('express').Router();
// const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/onboarding.controller');

// router.use(auth);

router.get('/personal', controller.getPersonal);
router.post('/personal', controller.savePersonal);


router.get('/medical', controller.getMedical);
router.post('/medical', controller.saveMedical);

router.get('/insurance', controller.getInsurance);
router.post('/insurance', controller.saveInsurance);

module.exports = router;
