const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  imagem: {
    type: Buffer
  },
  nomeCompleto: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  cartaoCredito: {
    nome: {
      type: String,
      required: true
    },
    numero: {
      type: String,
      required: true
    },
    cvc: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
