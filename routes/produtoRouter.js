const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/cadastrar', upload.single('imagem'), produtoController.cadastrarProduto);
router.put('/editar/:codigo', upload.single('imagem'), produtoController.editarProduto);
router.get('/listar', produtoController.listarProdutos);
router.get('/buscar/:codigo', produtoController.listarProdutoPorCodigo);

module.exports = router;
