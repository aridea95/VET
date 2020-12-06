const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.json("Welcome to Vet API");
});

// const roleRoutes = require('./role');
// router.use('/role', roleRoutes);

const userRoutes = require('./user');
router.use('/user', userRoutes);

const patientRoutes = require('./patient');
router.use('/patient', patientRoutes)

const animalTypeRoutes = require('./animalType');
router.use('/animal-type', animalTypeRoutes)

const facilityRoutes = require('./facility');
router.use('/facility', facilityRoutes)

const veterinaryRoutes = require('./veterinary');
router.use('/veterinary', veterinaryRoutes);

const clinicRoutes = require('./clinic');
router.use('/clinic', clinicRoutes);

const animalRoutes = require('./animal');
router.use('/animal', animalRoutes)

const scheduleRoutes = require('./schedule');
router.use('/schedule', scheduleRoutes);

const reservationRoutes = require('./reservation');
router.use('/reservation', reservationRoutes)

const chatRoutes = require('./chat');
router.use('/chat', chatRoutes);

module.exports = router;