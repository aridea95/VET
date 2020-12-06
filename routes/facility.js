const { Router } = require('express');
const router = Router();
const facilityController = require('../controllers/Facility');


router.get('/', facilityController.getFacility);
router.post('/', facilityController.createFacility);
router.delete('/:id', facilityController.deleteFacility);


module.exports = router;