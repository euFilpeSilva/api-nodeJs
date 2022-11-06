
const express = require('express');


const router = express.Router();

const controlador = require('../controllers/productController')

router.get('/', controlador.listar);
router.get('/:id', controlador.listarPorId);
router.get('/', controlador.criar);
router.get('/:id', controlador.atualizar);
router.get('/:id', controlador.remover);

module.exports = router;