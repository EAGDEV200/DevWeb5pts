const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigo: Number,
  produtos: [
    {
      produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
      quantidade: Number
    }
  ],
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  status: String
});

module.exports = mongoose.model('Pedido', pedidoSchema);
