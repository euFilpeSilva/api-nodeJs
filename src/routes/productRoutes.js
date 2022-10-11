const express = require("express");
const productControllers = require('../controllers/productController');
const routes = express.Router();



// rota pra listar os produtos
routes.get("/produtos", productControllers.listar);

// Consultar um unico produto
routes.get("/produto/:id", productControllers.listarPorId);

// Cadastrar produtos
routes.post("/criarProduto", productControllers.criar);

// Deletar produtos
routes.delete("/produto/:id", productControllers.remover);

// Atualizar produto
routes.put("produto/:id", productControllers.atualizar);

module.exports = routes;
