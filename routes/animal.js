const { Router } = require('express');
const router = Router();
const AnimalController = require('../controllers/Animal');
const { Authentication, isPatient } = require('../middlewares/auth');

router.get('/', AnimalController.getAnimal);
router.post('/add', Authentication, isPatient, AnimalController.addAnimal);
router.get('/user', Authentication, isPatient, AnimalController.getAnimalsByUser);
router.delete('/remove/:id', Authentication, isPatient, AnimalController.removeAnimal);

router.post('/create', AnimalController.createAnimal);
router.get('/find/:id', AnimalController.findAnimalById);
router.delete('/delete/:id', AnimalController.deleteAnimal);

module.exports = router