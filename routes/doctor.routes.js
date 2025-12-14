const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth(['DOCTOR', 'PATIENT']));

router.get('/', doctorController.getDoctors);

module.exports = router;
