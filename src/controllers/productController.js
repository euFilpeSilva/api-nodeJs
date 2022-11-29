const { ObjectID } = require('bson');
const Produto = require("../models/productsModel");


const { v4: uuidv4 } = require('uuid');
const { response } = require('../app');
uuidv4();

async  function listar(req,res){
    await Produto.find({})
    .then(produtos => {return res.json(produtos)})
    .catch( error => {return res.status(500).json(error)});
        
};

async function listarPorId(req,res){
    await Produto.findOne({_id: ObjectID(req.params.id)})
    .then(Produto => {
        if(Produto) return res.json(Produto);
        else return res.status(404).json('Produto Não Localizado');
    })
    .catch(error => {return res.status(500).json(error) });
};


async function criar(req, res){
    const produto =  new Produto(req.body);
    await produto.save()
    .then (doc => {
        return res.status(201).json(doc);
    })
    .catch(error => {
        const msgErro = {};
        Object.values(error.errors).forEach(({properties}) => {
            msgErro[properties.path] = properties.message;
        });
        return res.status(422).json(msgErro);
})
}

async function atualizar(req,res){

    await Produto.findOneAndUpdate({_id:ObjectID(req.params.id)},req.body, {runValidators : true})
    .then(Produto => {
        if(Produto) {return res.status(204).end()}
        else{ return res.status(404).json("produto não localizado")};
    })
    .catch(error => {
        const msgErro = {};
        Object.values(erro.errors).forEach(({properties}) => {
            msgErro[properties.path] = properties.message;
        });
        return res.status(422).json(msgErro);
    });

};

async function remover(req,res){
    await Produto.findOneAndDelete({_id: ObjectID(req.params.id) })
    .then(Produto => {
        if(Produto) return res.status(204).end();
        else return res.status(404).json('produto Não localizado'); 
    })
    .catch (error => {return res.status(500).json (error) });
};


module.exports = {
    listar,
    listarPorId,
    criar,
    atualizar,
    remover
}
