const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: Number,
  nome: String,
  imagem: String,
  descricao: String,
  preco: Number,
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
  animal: String,
  comentarioTexto: String,
  comentarioNota: Number,
  notaGeral:Number
});

module.exports = mongoose.model('Produto', produtoSchema);
