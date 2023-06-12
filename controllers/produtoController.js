const Produto = require('../models/produtoModel');
const multer = require('multer');
const Categoria = require('../models/categoriaModel');
const { ObjectId } = require('mongoose').Types;

// Configuração do Multer para salvar as imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Especifique o caminho onde deseja salvar as imagens
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`; // Adicione um prefixo de data/hora ao nome do arquivo
    cb(null, fileName);
  }
});

const upload = multer({ storage });

class ProdutoController {
  async cadastrarProduto(req, res) {
    try {
      upload.single('imagem')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          console.log('Erro Multer:', err);
          return res.status(400).json({ error: 'Erro ao fazer o upload da imagem' });
        } else if (err) {
          console.log('Erro interno do servidor:', err);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
  
        const produto = req.body;
        produto.imagem = req.file ? req.file.filename : '';
  
        const categoriaExistente = await Categoria.findOne({}); // Busca qualquer categoria existente no banco
        if (!categoriaExistente) {
          return res.status(404).json({ error: 'Nenhuma categoria encontrada' });
        }
        produto.categoria = categoriaExistente._id;
  
        console.log('Novo produto:', produto);
  
        const novoProduto = await Produto.create(produto);
        console.log('Produto cadastrado:', novoProduto);
        res.status(201).json(novoProduto);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao cadastrar o produto' });
    }
  }

  async editarProduto(req, res) {
    try {
      const codigo = req.params.codigo;
      const produto = req.body;

      upload.single('imagem')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          console.log('Erro Multer:', err);
          return res.status(400).json({ error: 'Erro ao fazer o upload da imagem' });
        } else if (err) {
          console.log('Erro interno do servidor:', err);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (req.file) {
          produto.imagem = req.file.filename;
        }

        if (produto.categoria && typeof produto.categoria === 'number') {
          // Converter o valor numérico para ObjectId
          produto.categoria = new ObjectId(produto.categoria);
        }

        console.log('Produto atualizado:', produto);

        const produtoAtualizado = await Produto.findOneAndUpdate(
          { codigo: codigo },
          produto,
          { new: true, overwrite: true }
        );

        console.log('Produto atualizado no banco:', produtoAtualizado);

        res.status(200).json(produtoAtualizado);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao editar o produto' });
    }
  }

  async retornarListaProdutos(req, res) {
    try {
      const produtos = await Produto.find();
      console.log('Lista de produtos:', produtos);
      res.status(200).json(produtos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar a lista de produtos' });
    }
  }

  async retornarProdutoPorCodigo(req, res) {
    try {
      const codigo = req.params.codigo;
      const produto = await Produto.findOne({ codigo: codigo });
      if (!produto) {
        console.log('Produto não encontrado');
        res.status(404).json({ message: 'Produto não encontrado' });
      } else {
        console.log('Produto encontrado:', produto);
        res.status(200).json(produto);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar o produto' });
    }
  }
}

module.exports = new ProdutoController();
