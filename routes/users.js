const express = require('express');
const router = express.Router();

const { validatorGetItem } = require('./../validators/users');
const { getItems, getItem } = require('../controllers/users');

/* Obtener lista users */
router.get('/', getItems);

/* Obtener un detalle user */
router.get('/:id', validatorGetItem, getItem);

module.exports = router