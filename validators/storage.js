const { check, validationResult } = require('express-validator');

const validatorGetItem = [
  check('id').exists().notEmpty().isMongoId(),

  (resquest, response, next) => {
    try {
      validationResult(resquest).throw();
      return next();
    } catch (error) {
      response.status(403);
      response.send({ error: error.array() })
    }
  }
];

module.exports = { validatorGetItem }