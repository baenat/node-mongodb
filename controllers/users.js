const { usersModel } = require('./../models');
const { handlerHttpError } = require('./../utils/handlerHttpError');
const { matchedData } = require('express-validator');

/* Obtener lista  */
const getItems = async (request, response) => {

  try {
    const data = await usersModel.find({});
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
    const data = await usersModel.findById(id);
    response.send({ data });
  } catch (e) {
    handlerHttpError(response, `ERROR_GET_ITEM: ${e}`);
  }

}

module.exports = { getItems, getItem }