const express = require('express');
const router = express.Router();
const { validatorLogin, validatorRegister } = require('./../validators/auth');
const { loginController, registerController } = require('./../controllers/auth');

/* Crear un usuario */
router.post('/register', validatorRegister, registerController);

/* Login usuario */
router.post('/login', validatorLogin, loginController);

module.exports = router;