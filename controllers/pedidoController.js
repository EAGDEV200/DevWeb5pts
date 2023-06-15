const Pedido = require('../models/pedidoModel');

class PedidoController {
  async efetuarPedido(req, res) {
    try {
      const pedido = req.body;
      console.log('Pedido recebido:', pedido);
      const resultado = await Pedido.create(pedido);
      console.log('Pedido cadastrado:', resultado);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Erro ao efetuar o pedido:', error);
      res.status(500).json({ error: 'Erro ao efetuar o pedido' });
    }
  }

  async editarStatusPedido(req, res) {
    try {
      const codigo = req.params.codigo;
      const status = req.body.status;
      console.log('Editar status do pedido:', codigo, status);
      const resultado = await Pedido.findOneAndUpdate(
        { codigo: codigo },
        { status: status },
        { new: true }
      );
      console.log('Pedido atualizado:', resultado);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Erro ao editar o status do pedido:', error);
      res.status(500).json({ error: 'Erro ao editar o status do pedido' });
    }
  }

  async retornarPedidoPorCliente(req, res) {
    try {
      const clienteId = req.params.clienteId;
      console.log('Buscar pedidos do cliente:', clienteId);
      const pedidos = await Pedido.find({ cliente: clienteId });
      console.log('Pedidos encontrados:', pedidos);
      res.status(200).json(pedidos);
    } catch (error) {
      console.error('Erro ao retornar os pedidos do cliente:', error);
      res.status(500).json({ error: 'Erro ao retornar os pedidos do cliente' });
    }
  }

  async retornarListaPedidos(req, res) {
    try {
      console.log('Listar todos os pedidos');
      const pedidos = await Pedido.find({});
      console.log('Pedidos encontrados:', pedidos);
      res.status(200).json(pedidos);
    } catch (error) {
      console.error('Erro ao retornar a lista de pedidos:', error);
      res.status(500).json({ error: 'Erro ao retornar a lista de pedidos' });
    }
  }
}

module.exports = new PedidoController();
