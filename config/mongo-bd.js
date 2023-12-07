const mongoose = require('mongoose');

const dbConnect = () => {

  const DB_URI = process.env.BD_URI;

  mongoose.connect(DB_URI)
    .then(() => console.log('*** Conexion correcta ***'))
    .catch(() => console.log('*** Error conexion ***'));

}

module.exports = dbConnect;