
const produtoModel = require('../models/produtoModel');
const categoriaModel = require('../models/categoriaModel');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

class ProdutoController {

  async cadastrarProduto(req, res) {
    try {
      const produto = req.body;
      produto.imagem = req.file ? req.file.buffer : null;
  
      const codigoCategoria = Number(produto.categoria);
  
      const categoria = await categoriaModel.findOne({ codigo: codigoCategoria });
      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }
  
      produto.categoria = categoria._id;
  
      const resultado = await produtoModel.create(produto);
  
      const produtoId = resultado._id;
  
      const comentarios = resultado.comentarios;
      const totalComentarios = comentarios.length;
      let somaNotas = 0;
  
      for (const comentario of comentarios) {
        somaNotas += comentario.nota;
      }
  
      const notaGeral = totalComentarios > 0 ? somaNotas / totalComentarios : 0;
  
      resultado.notaGeral = notaGeral;
  
      await resultado.save();
  
      console.log('Produto cadastrado:', resultado);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Erro ao cadastrar o produto:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o produto' });
    }
  }
  
  async editarProduto(req, res) {
    try {
      const codigo = req.params.codigo;
      const produto = req.body;
  
      // Verifica se há uma nova imagem sendo enviada
      if (req.file) {
        produto.imagem = req.file.buffer; // Salva o conteúdo binário da nova imagem no campo "imagem" do produto
      }
  
      const produtoExistente = await produtoModel.findOne({ codigo: codigo });
      if (!produtoExistente) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
  
      // Mantém a imagem existente se nenhuma nova imagem for enviada
      if (!produto.imagem) {
        produto.imagem = produtoExistente.imagem;
      }
  
      // Verificar se a nova categoria existe
      const codigoNovaCategoria = produto.categoria;
      const categoriaExistente = await categoriaModel.findOne({ codigo: codigoNovaCategoria });
      if (!categoriaExistente) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }
  
      // Atualizar a categoria do produto
      produto.categoria = categoriaExistente._id;
  
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
