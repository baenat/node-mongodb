const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user.id
    },
    JWT_SECRET
  );

  return sign;
};

/**
 * Token de session JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (e) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken }