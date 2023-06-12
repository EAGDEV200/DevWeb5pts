const categoriaModel = require('../models/categoriaModel');

class CategoriaController {
  async cadastrarCategoria(req, res) {
    try {
      const categoria = req.body;
      const resultado = await categoriaModel.create(categoria);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar a categoria' });
    }
  }

  async editarCategoria(req, res) {
    try {
      const codigo = req.params.codigo;
      const categoria = req.body;
      const resultado = await categoriaModel.findOneAndUpdate(
        { codigo: codigo },
        categoria,
        { new: true }
      );
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao editar a categoria' });
    }
  }

  async listarCategorias(req, res) {
    try {
      const categorias = await categoriaModel.find({});
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar as categorias' });
    }
  }

  async buscarPorCodigo(req, res) {
    try {
      const codigo = req.params.codigo;
      const categoria = await categoriaModel.findOne({ codigo: codigo });
      if (!categoria) {
        res.status(404).json({ error: 'Categoria não encontrada' });
      } else {
        res.status(200).json(categoria);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a categoria' });
    }
  }
}

module.exports = new CategoriaController();
