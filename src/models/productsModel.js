const mongoose = require('mongoose');

const produtosSchema = new mongoose.Schema({
        nome:
        {
            type : String,
            required: [true, "Nome é obrigatório"],
            trim: true,
            minLenght: [3, 'Nome deve conter minimo 3 caracter'],
            
        },
        marca:
        {
            type : String,
            required: [true, "Marca Obrigatoria"]
        },
        price:
        {
            type : String,
            required: [true, "Preço é obrigatório"]            
        }

},{
    timestamps: true
});

module.exports = mongoose.model("produtos", produtosSchema);