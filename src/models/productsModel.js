const mongoose = require('mongoose');

const produtosSchema = new mongoose.Schema({
        nome:
        {
            type : String,
            required: [true, "Nome é obrigatório"],
            trim: true,
            minLenght: [3, 'Nome deve conter pelomenos 3 caracteres'],
            
        },
        marca:
        {
            type : String,
            required: [true, "Marca é obrigatório"]
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