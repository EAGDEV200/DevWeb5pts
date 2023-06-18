
const Pedido = require('../models/pedidoModel');
const Produto = require('../models/produtoModel');
const Cliente = require('../models/clienteModel');

class PedidoController {
  async efetuarPedido(req, res) {
    try {
      const pedido = req.body;
      console.log('Pedido recebido:', pedido);

      if (!Array.isArray(pedido.produtos) || pedido.produtos.length === 0) {
        throw new Error('A propriedade "produtos" não é um array válido ou está vazia.');
      }

      // Consulta os produtos pelo código
      const produtosIds = pedido.produtos.map(item => item.produto);
      const produtosEncontrados = await Produto.find({ codigo: { $in: produtosIds } });

      // Verifica se todos os produtos foram encontrados
      if (produtosIds.length !== produtosEncontrados.length) {
        throw new Error('Alguns produtos não foram encontrados.');
      }

      // Consulta o cliente pelo código
      const clienteEncontrado = await Cliente.findOne({ codigo: pedido.cliente });

      // Calcula o preço total do pedido usando os produtos encontrados
      let precoTotal = 0;
      for (const item of pedido.produtos) {
        const produtoEncontrado = produtosEncontrados.find(produto => produto.codigo === item.produto);
        const quantidade = item.quantidade;
        const preco = produtoEncontrado.preco;
        precoTotal += preco * quantidade;
      }

      // Define o preço total e a data/hora no pedido
      pedido.precoTotal = precoTotal;
      pedido.dataHora = new Date();
      pedido.produtos = pedido.produtos.map((item, index) => ({
        produto: produtosEncontrados.find(produto => produto.codigo === item.produto)._id,
        quantidade: item.quantidade
      }));
      pedido.cliente = clienteEncontrado._id;

      const resultado = await Pedido.create(pedido);
      resultado.precoTotal = pedido.precoTotal;
      resultado.dataHora = pedido.dataHora;

      console.log('Pedido cadastrado:', resultado);
      res.status(201).json({
        codigo: resultado.codigo,
        produtos: resultado.produtos,
        cliente: resultado.cliente,
        status: resultado.status,
        precoTotal: resultado.precoTotal,
        dataHora: resultado.dataHora
      });
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
      const codigoCliente = req.params.codigoCliente;

      const clienteEncontrado = await Cliente.findOne({ codigo: codigoCliente });
      if (!clienteEncontrado) {
        console.error(`Cliente não encontrado para o código ${codigoCliente}`);
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      const pedido = await Pedido.findOne({ cliente: clienteEncontrado._id });
      if (!pedido) {
        console.error(`Pedido não encontrado para o cliente ${clienteEncontrado.nomeCompleto}`);
        return res.status(404).json({ message: 'Pedido não encontrado para este cliente' });
      }

      res.json(pedido);
    } catch (error) {
      console.error('Erro ao retornar o pedido por cliente:', error);
      res.status(500).json({ error: 'Erro ao retornar o pedido por cliente' });
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
