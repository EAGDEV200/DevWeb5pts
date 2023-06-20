require("./mongodb");
const Cliente = require("../models/clienteModel");
const Categoria = require("../models/categoriaModel");
const Produto = require("../models/produtoModel");
const Pedido = require("../models/pedidoModel");
const clientes = require("./clientes.json");
const categorias = require("./categorias.json");
const produtos = require("./produtos.json");
const pedidos = require("./pedidos.json");

async function carregarDados() {
  try {
    // Remover todos os documentos de Cliente
    await Cliente.deleteMany({});
    console.log("Clientes removidos!");

    // Carregar clientes
    for (const cliente of clientes) {
      await Cliente.create(cliente);
    }
    console.log("Carga de clientes concluída!");

    // Remover todos os documentos de Categoria
    await Categoria.deleteMany({});
    console.log("Categorias removidas!");

    // Carregar categorias
    for (const categoria of categorias) {
      await Categoria.create(categoria);
    }
    console.log("Carga de categorias concluída!");

    // Remover todos os documentos de Produto
    await Produto.deleteMany({});
    console.log("Produtos removidos!");

    // Carregar produtos
    for (const produto of produtos) {
      const categoria = await Categoria.findOne({ codigo: produto.categoria });
      if (categoria) {
        produto.categoria = categoria._id;
        const novoProduto = new Produto(produto);
        await novoProduto.save();
      }
    }
    console.log("Carga de produtos concluída!");

    // Remover todos os documentos de Pedido
    await Pedido.deleteMany({});
    console.log("Pedidos removidos!");

    // Carregar pedidos
    for (const pedido of pedidos) {
      const cliente = await Cliente.findOne({ codigo: pedido.cliente });
      if (cliente) {
        pedido.cliente = cliente._id;
        const novoPedido = new Pedido(pedido);
        await novoPedido.save();
      }
    }
    console.log("Carga de pedidos concluída!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregarDados();
