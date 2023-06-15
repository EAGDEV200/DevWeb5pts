const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.post('/pedido/cadastrar', pedidoController.efetuarPedido);
router.put('/pedido/:codigo/status', pedidoController.editarStatusPedido);
router.get('/cliente/:clienteId/pedidos', pedidoController.retornarPedidoPorCliente);
router.get('/pedidos', pedidoController.retornarListaPedidos);

module.exports = router;
