const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
  },
  nome: {
    type: String,
  },
  imagem: {
    type: Buffer
  },
  descricao: {
    type: String,
  },
  preco: {
    type: Number,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  },
  animal: {
    type: String,
  },
  comentarios: [{
    texto: {
      type: String,
    },
    nota: {
      type: Number,
    }
  }],
  notaGeral: {
    type: Number,
    default: 0
  }
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
