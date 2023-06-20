require("./mongodb");
const mongoose = require("mongoose");
const Produto = require("../models/produtoModel");
const Categoria = require("../models/categoriaModel");
const produtos = require("./produtos.json");
const categorias = require("./categorias.json");

async function carregarDados() {
  try {
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
      produto.categoria = categoria._id;
      const novoProduto = new Produto(produto);
      await novoProduto.save();
    }
    console.log("Carga de produtos concluída!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregarDados();
