const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


router.post('/cadastrar', clienteController.cadastrarCliente);
router.put('/editar/:codigo', clienteController.editarCliente);
router.get('/listar', clienteController.retornarListaClientes);
router.get('/buscar/:codigo', clienteController.retornarClientePorCodigo);

module.exports = router;
