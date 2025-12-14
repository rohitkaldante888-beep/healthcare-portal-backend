
const express = require("express");
const router = express.Router();
const doctor = require("../controllers/doctor.controller");
// const auth = require("../middleware/auth.middleware");

router.get("/", doctor.getDoctors);


module.exports = router;