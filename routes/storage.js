const express = require('express');
const router = express.Router();

const uploadMiddleware = require('./../utils/handlerStorage');
const { validatorGetItem } = require('./../validators/storage');

const { getItems, getItem, createtItem, updateItem, deleteItem } = require('./../controllers/storage');

/* Obtener lista  */
router.get('/', getItems);

/* Obtener un detalle */
router.get('/:id', validatorGetItem, getItem);

/* Crear un registro */
router.post('/', uploadMiddleware.single('myFile'), createtItem);

/* Actualizar un registro */
// router.put('/:id', validatorGetItem, updateItem);

/* Eliminar un registro */
router.delete('/:id', validatorGetItem, deleteItem)


module.exports = router