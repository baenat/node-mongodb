const { check, validationResult } = require('express-validator');

const validatorCreateItem = [
  check('name').exists().notEmpty(),
  check('album').exists().notEmpty(),
  check('cover').exists().notEmpty(),
  check('artist.name').exists().notEmpty(),
  check('artist.nickname').exists().notEmpty(),
  check('artist.nationality').exists().notEmpty(),
  check('duration.start').exists().notEmpty(),
  check('duration.end').exists().notEmpty(),
  check('mediaId').exists().notEmpty().isMongoId(),

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

const validatorDeleteItem = [
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

module.exports = { validatorCreateItem, validatorGetItem, validatorDeleteItem }