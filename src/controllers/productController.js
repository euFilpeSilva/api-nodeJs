const { ObjectID } = require('bson');
const { PromiseProvider } = require('mongoose');
const produto = require("../models/productsModel");


const { v4: uuidv4 } = require('uuid');
uuidv4();


async  function listar(req,res){
    await produto.find({})
    .then(produtos => {return res.json(produtos)})
    .catch( error => {return res.status(500).json(error)});
        
};

async function listarPorId(req,res){
    await produto.findOne({_id: ObjectID(req.params.id)})
    .then(produto => {
        if(produto) return res.json(produto);
        else return res.status(404).json('Produto Não Localizado');
    })
    .catch(error => {return res.status(500).json(error) });
};


async function criar (req, res){
    const produto =  new produto(req.body);
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

    await produto.findOneAndUpdate({_id:ObjectID(req.params.id)},req.body, {runValidators : true})
    .then(produto => {
        if(produto) {return res.status(204).end()}
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
    await produto.findOneAndDelete({_id: ObjectID(req.params.id) })
    .then(produto => {
        if(produto) return res.status(204).end();
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

module.exports = {listar, listarPorId, criar, atualizar, remover};