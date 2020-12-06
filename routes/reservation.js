const { Router } = require('express');
const router = Router();
const reservationController = require('../controllers/Reservation');
const { Authentication, isPatient, isClinic, isVeterinary } = require('../middlewares/auth');


router.get('/', reservationController.getReservation);
router.get('/form/:id', reservationController.formReservation);
router.post('/choose/:id', Authentication, isPatient, reservationController.chooseDateReservation);
router.post('/create/:id', Authentication, isPatient, reservationController.createReservation);
router.get('/find-patient', Authentication, isPatient, reservationController.getReservationByPatient);
router.get('/find-clinic', Authentication, isClinic, reservationController.getReservationByClinic);
router.get('/history-patient', Authentication, isPatient, reservationController.showHistoryPatient);
router.get('/history-clinic', Authentication, isClinic, reservationController.showHistoryClinic);
router.get('/history-vet', Authentication, isVeterinary, reservationController.showHistoryVeterinary);
router.get('/appointment-patient', Authentication, isPatient, reservationController.showAppointmentPatient);
router.get('/appointment-clinic', Authentication, isClinic, reservationController.showAppointmentClinic);
router.get('/appointment-vet', Authentication, isVeterinary, reservationController.showAppointmentVeterinary);
router.put('/approved/:id', Authentication, isVeterinary, reservationController.approved);
router.put('/rejected/:id', Authentication, isVeterinary, reservationController.rejected);


module.exports = router;