const mongoose = require('mongoose');

/* Coleccion de Almacenamiento */
const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String
    },
    filename: {
      type: String
    }
  },
  {
    /* createdAt, updatedAt */
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('storage', StorageScheme);