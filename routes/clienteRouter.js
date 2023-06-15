const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/cadastrar', upload.single('imagem'), clienteController.cadastrarCliente);
router.put('/editar/:codigo', upload.single('imagem'), clienteController.editarCliente);
router.get('/listar', clienteController.retornarListaClientes);
router.get('/buscar/:codigo', clienteController.retornarClientePorCodigo);

module.exports = router;
