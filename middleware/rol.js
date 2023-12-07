const { handlerHttpError } = require("../utils/handlerHttpError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (request, response, next) => {

  try {
    const { user } = request;
    const rolesUser = user.roles;
    const checkRol = roles.some((rol) => rolesUser.includes(rol));

    if (!checkRol) {
      handlerHttpError(response, 'USER_NOT_PERMISSION', 403);
      return;
    }

    next();
    
  } catch (e) {
    handlerHttpError(response, 'ERROR_PERMISSION', 403);
  }

};

module.exports = { checkRol };