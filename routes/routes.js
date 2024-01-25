// const express = require('express');
// /* Paquete fileSystem */
// const fs = require('fs');
// /* Router => Manejador de las rutas  */
// const router = express.Router();

// /* Ruta obsoluta */
// const PATH_ROUTES = __dirname;

// const removeExtension = (fileName) => {
//   return fileName.split('.').shift();
// }

// fs.readdirSync(PATH_ROUTES).filter((file) => {
//   const name = removeExtension(file);
//   if (name != 'routes') {
//     /* http://localhost:3000/api/name */
//     console.log(typeof `${file}`, `${file}`);
//     router.use(`/${name}`, require(`./${file}`));
//   }
// });

// module.exports = router;



/* Forma normal */

const express = require('express');

const tracksRouter = require('./tracks');
const storageRouter = require('./storage');
const authRouter = require('./auth');
const userRouter = require('./users');

function routerApp(app) {

  const router = express.Router();

  app.use('/api', router);

  router.use('/tracks', tracksRouter);
  router.use('/storage', storageRouter);
  router.use('/auth', authRouter);
  router.use('/users', userRouter);

  router.use('*', (resquest, response) => {
    response.status(404).json({ error: 'Path not found' });
  });

}

module.exports = routerApp;