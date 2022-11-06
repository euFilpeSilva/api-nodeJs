const express = require('express');

const contatos = require('./routes/productRoutes');

const app = express();
app.use(express.json()); // req.body
 

app.use('/produtos', contatos);

module.exports = app;