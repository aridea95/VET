const { Router } = require('express');
const router = Router();
const ScheduleController = require('../controllers/Schedule');
const { Authentication } = require('../middlewares/auth');

router.get('/', ScheduleController.getSchedule);
router.get('/:ClinicId', ScheduleController.getScheduleByTime);

module.exports = router;