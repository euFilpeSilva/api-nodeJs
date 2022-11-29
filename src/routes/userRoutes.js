
const express = require("express");
const productControllers = require('../controllers/userController');
const router = express.Router();

router.post("/auth/register", productControllers.autenticaUsuario);

router.post("/auth/login", productControllers.userLogin);

// rota privada brear
router.get('/:id', productControllers.rotaPrivada,productControllers.checkToken)

module.exports = router;