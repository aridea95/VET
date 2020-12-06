const { Router } = require('express');
const router = Router();
const animalTypeController = require('../controllers/AnimalType');


router.get('/', animalTypeController.getAnimalType);
router.post('/', animalTypeController.createAnimalType);
router.delete('/:id', animalTypeController.deleteAnimalType);


module.exports = router;