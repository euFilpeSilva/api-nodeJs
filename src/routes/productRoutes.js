const express = require("express");
const productControllers = require('../controllers/productController');
const routes = express.Router();



// rota pra listar os produtos
routes.get("/produtos", productControllers.listar);

// Consultar um unico produto
routes.get("/produtosPorId/:id", productControllers.listarPorId);

// Cadastrar produtos
routes.post("/criarProduto", productControllers.criar);

// Deletar produtos
routes.delete("/deeteProduto/:id", productControllers.remover);

// Atualizar produto
routes.put("/atualizaProduto/:id", productControllers.atualizar);

module.exports = routes;
