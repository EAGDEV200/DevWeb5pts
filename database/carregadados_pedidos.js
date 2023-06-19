require("./mongodb");
const mongoose = require("mongoose");
const Pedido = require("../models/pedidoModel");
const Produto = require("../models/produtoModel");
const Cliente = require("../models/clienteModel");
const pedidos = require("./pedidos.json");

async function carregarDados() {
  try {
    await Pedido.deleteMany({});
    console.log("Pedidos removidos!");

    for (const pedido of pedidos) {
      const { produtos, cliente, ...pedidoData } = pedido;

      const produtosIds = [];

      for (const produto of produtos) {
        const produtoEncontrado = await Produto.findOne({
          codigo: produto.produto
        });

        if (!produtoEncontrado) {
          console.log(`Produto com código ${produto.produto} não encontrado.`);
          continue;
        }

        produtosIds.push({
          produto: produtoEncontrado._id,
          quantidade: produto.quantidade
        });
      }

      const clienteEncontrado = await Cliente.findOne({
        codigo: cliente
      });

      if (!clienteEncontrado) {
        console.log(`Cliente com código ${cliente} não encontrado.`);
        continue;
      }

      pedidoData.produtos = produtosIds;
      pedidoData.cliente = clienteEncontrado._id;

      const novoPedido = new Pedido(pedidoData);
      await novoPedido.save();
    }

    console.log("Carga de pedidos concluída!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregarDados();
