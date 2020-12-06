const { Router } = require('express');
const router = Router();

const ClinicController = require('../controllers/Clinic');
const { Authentication, isClinic } = require('../middlewares/auth');

router.get('/', ClinicController.getClinic);
router.post('/add', Authentication, isClinic, ClinicController.addSchedule);
router.delete('/remove/:ScheduleId', Authentication, isClinic, ClinicController.removeSchedule);
router.post('/facility', Authentication, isClinic, ClinicController.addFacilities);
router.delete('/facility', Authentication, isClinic, ClinicController.removeFacilities);
router.get('/filter', ClinicController.filterClinic);
router.post('/veterinary/:VetId', Authentication, isClinic, ClinicController.addVet);
router.delete('/veterinary/:VetId', Authentication, isClinic, ClinicController.deleteVet);
router.get('/veterinary', Authentication, isClinic, ClinicController.listVet);
router.get('/filter-name', ClinicController.filterClinicByName);
router.put('/online/:id', Authentication, ClinicController.online);
router.get('/getAll', ClinicController.getAll);

//basic
router.post('/', ClinicController.createClinic);
router.put('/edit/:id', ClinicController.editClinic);

module.exports = router;