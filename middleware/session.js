const { usersModel } = require('../models');
const { verifyToken } = require('../utils/handlerJwt');
const { handlerHttpError } = require('./../utils/handlerHttpError')

const authMiddleware = async (request, response, next) => {

  try {
    
    if (!request.headers.authorization) {
      handlerHttpError(response, 'NOT_TOKEN_SESSION', 401);
      return;
    }

    const token = request.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handlerHttpError(response, 'ERROR_ID_TOKEN', 401);
      return;
    }

    const user = await usersModel.findById(dataToken._id);
    request.user = user;

    next();

  } catch (e) {
    handlerHttpError(response, 'NOT_SESSION', 401);
  }

}

module.exports = { authMiddleware };