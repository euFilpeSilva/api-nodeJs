const express = require('express');

const produtos = require('./routes/productRoutes');

const app = express();
app.use(express.json()); // req.body
 

app.use('/produtos', produtos);
app.use('/api-docs', produtos);

module.exports = app;