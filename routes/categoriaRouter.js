const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/cadastrar', categoriaController.cadastrarCategoria);
router.put('/editar/:codigo', categoriaController.editarCategoria);
router.get('/listar', categoriaController.listarCategorias);
router.get('/buscar/:codigo', categoriaController.buscarPorCodigo);

module.exports = router;
