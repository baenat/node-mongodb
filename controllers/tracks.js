const { tracksModel } = require('./../models');
const { handlerHttpError } = require('../utils/handlerHttpError');
const { matchedData } = require('express-validator')

/* Obtener lista  */
const getItems = async (request, response) => {

  try {
    // const data = await tracksModel.find({});
    const data = await tracksModel.findAllData({});
    response.send({ data });
  } catch (e) {
    handlerHttpError(response, 'ERROR_GET_ITEMS');
  }

}

/* Obtener un detalle */
const getItem = async (request, response) => {

  try {
    const req = matchedData(request);
    const { id } = req;
    // const data = await tracksModel.findById(id);
    const data = await tracksModel.findOneData(id);
    response.send({ data });
  } catch (e) {
    handlerHttpError(response, `ERROR_GET_ITEM: ${e}`);
  }

}

/* Crear un registro */
const createtItem = async (request, response) => {

  try {
    // const { body } = request;
    const dataClean = matchedData(request);

    const data = await tracksModel.create(dataClean);
    response.send({ data });
  } catch (e) {
    handlerHttpError(response, 'ERROR_CREATE_ITEM');
  }

}

/* Actualizar un registro */
const updateItem = async (request, response) => {

  try {
    const {id, ...body} = matchedData(request);
    const data = await tracksModel.findByIdAndUpdate(id, body);
    response.send({data });
  } catch (e) {
    handlerHttpError(response, `ERROR_UPDATE_ITEM: ${e}`);
  }

}

/* Eliminar un registro */
const deleteItem = async (request, response) => {

  try {
    const { id } = matchedData(request);
    const data = await tracksModel.deleteOne({_id: id});
    response.send({ message: 'Registro eliminado',data });
  } catch (e) {
    handlerHttpError(response, `ERROR_DELETE_ITEM: ${e}`);
  }

}

module.exports = { getItems, getItem, createtItem, updateItem, deleteItem }