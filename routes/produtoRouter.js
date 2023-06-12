const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/cadastrar', produtoController.cadastrarProduto);
router.put('/editar/:codigo', produtoController.editarProduto);
router.get('/listar', produtoController.retornarProdutoPorCodigo);
router.get('/buscar/:codigo', produtoController.retornarProdutoPorCodigo);

module.exports = router;
