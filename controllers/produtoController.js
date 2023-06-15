const produtoModel = require('../models/produtoModel');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

class ProdutoController {
  async cadastrarProduto(req, res) {
    try {
      const produto = req.body;
      produto.imagem = req.file ? req.file.buffer : null; // Salva o conteúdo binário da imagem no campo "imagem" do produto

      const resultado = await produtoModel.create(produto);
      console.log('Produto cadastrado:', resultado);
      res.status(201).json(resultado);
    } catch (error) {
      console.log('Erro ao cadastrar o produto:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o produto' });
    }
  }

  async editarProduto(req, res) {
    try {
      const codigo = req.params.codigo;
      const produto = req.body;
      produto.imagem = req.file ? req.file.buffer : null; // Salva o conteúdo binário da imagem no campo "imagem" do produto

      const resultado = await produtoModel.findOneAndUpdate(
        { codigo: codigo },
        produto,
        { new: true }
      );

      console.log('Produto editado:', resultado);
      res.status(200).json(resultado);
    } catch (error) {
      console.log('Erro ao editar o produto:', error);
      res.status(500).json({ error: 'Erro ao editar o produto' });
    }
  }

  async listarProdutos(req, res) {
    try {
      const produtos = await produtoModel.find({});
      console.log('Lista de produtos:', produtos);
      res.status(200).json(produtos);
    } catch (error) {
      console.log('Erro ao retornar a lista de produtos:', error);
      res.status(500).json({ error: 'Erro ao retornar a lista de produtos' });
    }
  }

  async listarProdutoPorCodigo(req, res) {
    try {
      const codigo = req.params.codigo;
      const produto = await produtoModel.findOne({ codigo: codigo });
      if (produto) {
        console.log('Produto encontrado:', produto);
        res.status(200).json(produto);
      } else {
        console.log('Produto não encontrado');
        res.status(404).json({ message: 'Produto não encontrado' });
      }
    } catch (error) {
      console.log('Erro ao retornar o produto:', error);
      res.status(500).json({ error: 'Erro ao retornar o produto' });
    }
  }
}

module.exports = new ProdutoController();
