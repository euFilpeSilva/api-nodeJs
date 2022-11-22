const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

const app = express();
const produtos = require('./routes/productRoutes');

app.use(express.json());


 
app.use('/produtos', produtos);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;