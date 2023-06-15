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
  }]
});

produtoSchema.virtual('notaGeral').get(function() {
  if (this.comentarios.length === 0) {
    return 0;
  } else {
    const somaNotas = this.comentarios.reduce((total, comentario) => {
      return total + comentario.nota;
    }, 0);
    return somaNotas / this.comentarios.length;
  }
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
