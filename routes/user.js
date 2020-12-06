const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/User');
const uploader = require('../middlewares/multer');
const { Authentication } = require('../middlewares/auth');

router.get('/', UserController.getUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/edit', Authentication, UserController.editUserForm);
router.put('/edit/', Authentication, uploader.single('image'), UserController.editUser);
router.delete('/', Authentication, UserController.deleteUser);


module.exports = router;