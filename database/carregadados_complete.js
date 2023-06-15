require("./mongodb");
const mongoose = require("mongoose");
const Pedido = require("../models/pedidoModel");
const Produto = require("../models/produtoModel");
const Cliente = require("../models/clienteModel");
const Categoria = require("../models/categoriaModel");
const pedidos = require("./pedidos.json");
const produtos = require("./produtos.json");
const clientes = require("./clientes.json");
const categorias = require("./categorias.json");

async function carregarDados() {
  try {
    await Categoria.deleteMany({});
    console.log("Categorias removidas!");

    for (const categoria of categorias) {
      await Categoria.create(categoria);
    }
    console.log("Carga de categorias concluída!");

    await Cliente.deleteMany({});
    console.log("Clientes removidos!");

    for (const cliente of clientes) {
      await Cliente.create(cliente);
    }
    console.log("Carga de clientes concluída!");

    await Produto.deleteMany({});
    console.log("Produtos removidos!");

    for (const produto of produtos) {
      const categoria = await Categoria.findOne({ codigo: produto.categoria });
      produto.categoria = categoria._id;

      await Produto.create(produto);
    }
    console.log("Carga de produtos concluída!");

    await Pedido.deleteMany({});
    console.log("Pedidos removidos!");

    for (const pedido of pedidos) {
      const produtos = [];

      for (const item of pedido.produtos) {
        const produto = await Produto.findOne({ codigo: item.produto });
        produtos.push({ produto: produto._id, quantidade: item.quantidade });
      }

      const cliente = await Cliente.findOne({ codigo: pedido.cliente });

      const novoPedido = new Pedido({
        codigo: pedido.codigo,
        precoTotal: pedido.precoTotal,
        produtos,
        cliente: cliente._id,
        dataHora: pedido.dataHora,
        status: pedido.status,
      });

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
