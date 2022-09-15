const express = require('express');
const app = express()

const bodyParser = require('body-parser');
const routes = require('./src/routes/productRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes)

module.exports = app;