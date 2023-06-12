const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rota para efetuar um pedido
router.post('/pedido/efetuar', pedidoController.efetuarPedido);

// Rota para editar os produtos do pedido
router.put('/pedido/editar-produtos', pedidoController.editarProdutosDoPedido);

// Rota para editar o status do pedido
router.put('/pedido/editar-status', pedidoController.editarStatusDoPedido);

// Rota para retornar os pedidos de um cliente
router.get('/pedido/cliente/:codigoCliente', pedidoController.retornarPedidoPorCliente);

// Rota para retornar a lista completa de pedidos
router.get('/pedido/lista', pedidoController.retornarListaPedidos);

module.exports = router;
