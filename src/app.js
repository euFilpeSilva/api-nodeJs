const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

const app = express();
const produtos = require('./routes/productRoutes');
const usuarios = require('./routes/userRoutes');

app.use(express.json());


 
app.use('/produtos', produtos);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', usuarios);


module.exports = app;