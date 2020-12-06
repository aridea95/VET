const express = require("express");
const router = express.Router();

const patientControllers = require("../controllers/Patient");

router.get('/', patientControllers.getPatient);
router.get('/:id', patientControllers.findPatientById);
router.put('/edit/:id', patientControllers.editPatient);
router.delete('/delete/:id', patientControllers.deletePatient);

router.post('/create', patientControllers.createPatient);

module.exports = router