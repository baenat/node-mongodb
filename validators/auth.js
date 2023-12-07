const { check, validationResult } = require('express-validator');

const validatorRegister = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 50 }),
  check('age').exists().notEmpty().isNumeric(),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),

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

const validatorLogin = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),

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

module.exports = { validatorRegister, validatorLogin }