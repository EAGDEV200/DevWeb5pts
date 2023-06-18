const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para cadastrar uma nova categoria
router.post('/cadastrar', categoriaController.cadastrarCategoria);

// Rota para editar uma categoria existente
router.put('/editar/:codigo', categoriaController.editarCategoria);

// Rota para retornar a lista completa de categorias
router.get('/listar', categoriaController.retornarListaCategorias);

// Rota para retornar uma categoria pelo código
router.get('/buscar/:codigo', categoriaController.retornarCategoriaPorCodigo);

module.exports = router;
