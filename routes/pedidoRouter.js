const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.post('/cadastrar', pedidoController.efetuarPedido);
router.put('/editar/:codigo/status', pedidoController.editarStatusPedido);
router.get('/pedidos/cliente/:codigoCliente', pedidoController.retornarPedidoPorCliente);
router.get('/listar', pedidoController.retornarListaPedidos);

module.exports = router;
