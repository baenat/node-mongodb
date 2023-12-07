const bcrypt = require('bcrypt');

/**
 * Encriptar contraseña de texto plano
 * @param {*} passPlain
 */
const encryp = async (passPlain) => {
  return await bcrypt.hash(passPlain, 10);
};

/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passPlain
 * @param {*} passEncryp
 */
const compare = async (passPlain, passEncryp) => {
  return await bcrypt.compare(passPlain, passEncryp);
};

module.exports = { encryp, compare }