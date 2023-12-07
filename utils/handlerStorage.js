const multer = require('multer');

const storage = multer.diskStorage({

  destination: (request, file, callback) => {
    const pathStorage = `${__dirname}/../storage`
    callback(null, pathStorage);
  },

  filename: (request, file, callback) => {
    const ext = file.originalname.split('.').pop();
    const filename = `file_${Date.now()}.${ext}`;
    callback(null, filename);
  },

});

const uploadMiddleware = multer({
  storage
});


module.exports = uploadMiddleware