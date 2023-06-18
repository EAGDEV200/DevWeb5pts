const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
  },
  produtos: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto'
    },
    quantidade: {
      type: Number,
    }
  }],
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  status: {
    type: String,
    enum: ['Em andamento', 'Concluído', 'Cancelado'],
    default: 'Em andamento'
  },
  precoTotal: {
    type: Number,
  },
  dataHora: {
    type: Date,
    default: Date.now
  }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
