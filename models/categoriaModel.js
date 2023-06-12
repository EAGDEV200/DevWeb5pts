const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  codigo: Number,
  nome: String,
  descricao: String,
});

module.exports = mongoose.model('Categoria', categoriaSchema);
