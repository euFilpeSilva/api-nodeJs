const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger.json')
const app = express()

const bodyParser = require('body-parser');
const routes = require('./src/routes/productRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes)

module.exports = app;
