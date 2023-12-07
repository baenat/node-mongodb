const express = require('express');
const router = express.Router();

const customHeader = require('./../middleware/customHeader');
const { authMiddleware } = require('../middleware/session');
const { checkRol } = require('../middleware/rol');
const { validatorCreateItem, validatorGetItem, validatorDeleteItem } = require('./../validators/tracks');
const { getItems, getItem, createtItem, updateItem, deleteItem } = require('./../controllers/tracks');

/* htpp://localhost/tracks | GET, POST, DELETE, PUT */

/* Obtener lista  */
router.get('/', authMiddleware, getItems);

/* Obtener un detalle */
router.get('/:id', validatorGetItem, getItem);

/* Crear un registro */
router.post('/', validatorCreateItem, authMiddleware, checkRol(['admin']), customHeader, createtItem);

/* Actualizar un registro */
router.put('/:id', validatorGetItem, validatorCreateItem, updateItem);

/* Eliminar un registro */
router.delete('/:id', validatorDeleteItem, deleteItem);

module.exports = router;