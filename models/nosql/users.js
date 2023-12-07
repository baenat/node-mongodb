const mongoose = require('mongoose');

/* Coleccion de Usuarios */
const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
    roles: {
      type: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    /* createdAt, updatedAt */
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('users', UserScheme);