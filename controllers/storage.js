const fs = require('fs');
const { storageModel } = require('./../models');
const { handlerHttpError } = require('./../utils/handlerHttpError');
const { matchedData } = require('express-validator');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`

/* Obtener lista  */
const getItems = async (request, response) => {

  try {
    const data = await storageModel.find({});
    response.send({ data });

  } catch (e) {
    handlerHttpError(response, `ERROR_GET_ITEMS: ${e}`);
  }

}

/* Obtener un detalle */
const getItem = async (request, response) => {

  try {
    // const { id } = request.params;
    const { id } = matchedData(request);
    console.log('request => ', request)
    const data = await storageModel.findById(id);
    response.send({ data });
  } catch (e) {
    handlerHttpError(response, `ERROR_GET_ITEM: ${e}`);
  }

}

/* Crear un registro */
const createtItem = async (request, response) => {

  try {
    const { file } = request;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData);
    response.status(201).json({ data });
  } catch (e) {
    handlerHttpError(response, `ERROR_CREATE_ITEM: ${e}`);
  }

}

/* Eliminar un registro */
const deleteItem = async (request, response) => {

  try {
    const { id } = matchedData(request);
    const { filename } = await storageModel.findById(id);
    await storageModel.deleteOne({_id: id});
    const filePath = `${MEDIA_PATH}/${filename}`;

    /* Eliminar archivo */
    fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1
    }
    response.send(data);
  } catch (e) {
    handlerHttpError(response, `ERROR_DELETE_ITEM: ${e}`);
  }
}

module.exports = { getItems, getItem, createtItem, deleteItem }