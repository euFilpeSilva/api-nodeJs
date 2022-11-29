const express = require("express");
const productControllers = require('../controllers/productController');
const routes = express.Router();



// rota pra listar os produtos
routes.get("/", productControllers.listar);

// Consultar um unico produto
routes.get("/listPorId/:id", productControllers.listarPorId);

// Cadastrar produtos
routes.post("/", productControllers.criar);

// Deletar produtos
routes.delete("/delete/:id", productControllers.remover);

// Atualizar produto
routes.put("/:id", productControllers.atualizar);

module.exports = routes;
