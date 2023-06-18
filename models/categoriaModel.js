const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    
  },
  nome: {
    type: String,
   
  },
  descricao: {
    type: String,
  }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
