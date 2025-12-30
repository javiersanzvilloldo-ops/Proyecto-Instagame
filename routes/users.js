const express = require('express');
const router = express.Router();
const userController = require ("../controllers/user.controllers");
const uploadImg = require('../middlewares/uploadImg');

//endpoint de la pagina perfil usuario
router.get('/profile/:id', userController.openProfile)

//endpoints del formulario de registro
router.get('/registerUser', userController.openFormUser)
router.post('/registerUser', uploadImg("users"), userController.register)


module.exports = router;
