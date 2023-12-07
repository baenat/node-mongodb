require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const dbConnect = require('./config/mongo-bd');
const routerApp = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use(express.static('storage'));

routerApp(app);

app.listen(port, () => {
  console.log(`App running http://localhost:${port}`);
});

dbConnect();