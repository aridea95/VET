const { Router } = require("express");
const router = Router();

const VeterinaryController = require('../controllers/Veterinary');
const { Authentication  } = require('../middlewares/auth');

router.get('/', VeterinaryController.getVeterinary)
router.post('/create', VeterinaryController.createVeterinary)
router.get('/edit/:id', VeterinaryController.editFormVeterinary)
router.put('/edit/:id', VeterinaryController.findVeterinaryById)
router.delete('/delete/:id', VeterinaryController.deleteVeterinary)
router.put('/online/:id', Authentication, VeterinaryController.online)

module.exports = router