const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({

  codigo: Number,
  //fotoPerfil: String,
  nomeCompleto: String,
  endereço: String,
  telefone: String,
  cpf: String,
  cartaoDeCredito: String,
  email: String,
  senha: String

});

module.exports = mongoose.model('Cliente', clienteSchema);
