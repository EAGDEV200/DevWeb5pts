const Pedido = require('../models/pedidoModel');
const Produto = require('../models/produtoModel');
const Cliente = require('../models/clienteModel');

class PedidoController {
  async efetuarPedido(req, res) {
    try {
      const { codigoCliente, produtos } = req.body;

      const cliente = await Cliente.findOne({ codigo: codigoCliente });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const produtosDoPedido = [];
      let precoTotal = 0;

      for (const { codigoProduto, quantidade } of produtos) {
        const produto = await Produto.findOne({ codigo: codigoProduto });
        if (!produto) {
          return res.status(404).json({ error: `Produto ${codigoProduto} não encontrado` });
        }

        const subtotal = produto.preco * quantidade;
        precoTotal += subtotal;

        produtosDoPedido.push({
          produto: produto._id,
          quantidade,
        });
      }

      const pedido = await Pedido.create({
        codigo: generatePedidoCode(), // função para gerar um código para o pedido
        precoTotal,
        produtos: produtosDoPedido,
        cliente: cliente._id,
        dataHora: new Date(),
        status: 'Em andamento',
      });

      res.status(201).json(pedido);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao efetuar o pedido' });
    }
  }

  async editarProdutosDoPedido(req, res) {
    try {
      const { codigoPedido, produtos } = req.body;

      const pedido = await Pedido.findOne({ codigo: codigoPedido });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      let precoTotal = 0;
      const produtosDoPedido = [];

      for (const { codigoProduto, quantidade } of produtos) {
        const produto = await Produto.findOne({ codigo: codigoProduto });
        if (!produto) {
          return res.status(404).json({ error: `Produto ${codigoProduto} não encontrado` });
        }

        const subtotal = produto.preco * quantidade;
        precoTotal += subtotal;

        produtosDoPedido.push({
          produto: produto._id,
          quantidade,
        });
      }

      pedido.produtos = produtosDoPedido;
      pedido.precoTotal = precoTotal;

      const pedidoAtualizado = await pedido.save();

      res.status(200).json(pedidoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao editar os produtos do pedido' });
    }
  }

  async editarStatusDoPedido(req, res) {
    try {
      const { codigoPedido, status } = req.body;

      const pedido = await Pedido.findOne({ codigo: codigoPedido });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      pedido.status = status;

      const pedidoAtualizado = await pedido.save();

      res.status(200).json(pedidoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao editar o status do pedido' });
    }
  }

  async retornarPedidoPorCliente(req, res) {
    try {
      const codigoCliente = req.params.codigoCliente;

      const cliente = await Cliente.findOne({ codigo: codigoCliente });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const pedidos = await Pedido.find({ cliente: cliente._id });

      res.status(200).json(pedidos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar o pedido do cliente' });
    }
  }

  async retornarListaPedidos(req, res) {
    try {
      const pedidos = await Pedido.find();

      res.status(200).json(pedidos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar a lista de pedidos' });
    }
  }
}

// Função auxiliar para gerar um código único para o pedido
function generatePedidoCode() {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${timestamp}-${randomNum}`;
}

module.exports = new PedidoController();
