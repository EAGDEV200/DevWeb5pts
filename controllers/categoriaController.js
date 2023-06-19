const Categoria = require('../models/categoriaModel');

class CategoriaController {

  async cadastrarCategoria(req, res) {
    try {
      const { codigo, nome, descricao } = req.body;

      // Verifique se todos os campos necessários estão presentes
      if (!codigo || !nome || !descricao) {
        console.log('Campos obrigatórios não preenchidos');
        return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
      }

      // Crie uma nova instância do modelo de categoria
      const novaCategoria = new Categoria({
        codigo,
        nome,
        descricao
      });

      // Salve a nova categoria no banco de dados
      const categoriaSalva = await novaCategoria.save();
      
      console.log('Categoria cadastrada:', categoriaSalva);

      res.status(201).json(categoriaSalva);
    } catch (error) {
      console.log('Erro ao cadastrar a categoria:', error);
      res.status(500).json({ error: 'Erro ao cadastrar a categoria.' });
    }
  }



  async editarCategoria(req, res) {
    try {
      const codigo = req.params.codigo;
      const categoriaAtualizada = req.body;

      const categoria = await Categoria.findOneAndUpdate(
        { codigo: codigo },
        { $set: categoriaAtualizada },
        { new: true }
      );

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      res.status(200).json(categoria);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao editar a categoria' });
    }
  }

  async retornarListaCategorias(req, res) {
    try {
      const categorias = await Categoria.find();
      res.status(200).json(categorias);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar a lista de categorias' });
    }
  }

  async retornarCategoriaPorCodigo(req, res) {
    try {
      const codigo = req.params.codigo;
      const categoria = await Categoria.findOne({ codigo: codigo });

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      res.status(200).json(categoria);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar a categoria' });
    }
  }
}

module.exports = new CategoriaController();
