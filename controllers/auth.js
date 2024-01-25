const { matchedData } = require('express-validator');
const { encryp, compare } = require('./../utils/handlerPassword');
const { tokenSign, verifyToken } = require('./../utils/handlerJwt');
const { handlerHttpError } = require('./../utils/handlerHttpError');
const { usersModel } = require('./../models');

/**
 * Controlador para registrar usuario
 * @param {*} request 
 * @param {*} response 
 */
const registerController = async (request, response) => {

  try {
    // const body = request.body;
    request = matchedData(request);
    const passwordHash = await encryp(request.password);
    const dataUser = { ...request, password: passwordHash };
    const data = await usersModel.create(dataUser);
    const token = await tokenSign(dataUser);
    response.send({ token });
  } catch (e) {
    handlerHttpError(response, `ERROR_REGISTER_USER: ${e}`);
  }

}

/**
 * Controlador para loguear un usuario
 * @param {*} request 
 * @param {*} response 
 */
const loginController = async (request, response) => {

  try {
    console.log('request, response => ', request, response)
    request = matchedData(request);
    const user = await usersModel.findOne({ email: request.email }).select('password name email role');

    if (!user) {
      handlerHttpError(response, `ERROR_NOT_EXITS_USER`, 404);
      return;
    }

    const hashPassword = user.password;
    const check = await compare(request.password, hashPassword);
    
    if (!check) {
      handlerHttpError(response, `PASSWORD_INVALID`, 401);
      return;
    }

    user.set('password', undefined, {strict: false});

    const data = {
      token: await tokenSign(user),
      user
    }

    response.send({ data });

  } catch (e) {
    handlerHttpError(response, `ERROR_LOGIN_USER: ${e}`);
  }

};

module.exports = { registerController, loginController };