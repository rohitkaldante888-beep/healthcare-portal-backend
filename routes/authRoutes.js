const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);

module.exports = router;