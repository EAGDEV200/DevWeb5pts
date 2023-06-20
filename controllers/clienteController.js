const clienteModel = require('../models/clienteModel');
const multer = require('multer');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

const storage = multer.memoryStorage();
const upload = multer({ storage });

class ClienteController {
  async cadastrarCliente(req, res) {
    try {
      const cliente = req.body;

      // Verifica se o cliente já está cadastrado pelo email
      if (await clienteModel.findOne({ 'email': cliente.email })) {
        return res.status(400).send({ error: 'Cliente já cadastrado!' });
      }

      cliente.imagem = req.file ? req.file.buffer : null; // Salva o conteúdo binário da imagem no campo "imagem" do cliente

      // Gerar o hash da senha do cliente
      const senhaHash = await bcryptjs.hash(cliente.senha, 10);
      cliente.senha = senhaHash;

      const resultado = await clienteModel.create(cliente);
      await auth.incluirToken(resultado); // Gera o token para o cliente cadastrado

      // Prepara a resposta enviada pelo Postman
      const response = {
        cliente: resultado,
        token: resultado.token // Inclui o token na resposta
      };

      console.log('Cliente cadastrado:', resultado);
      res.status(201).json(response);
    } catch (error) {
      console.log('Erro ao cadastrar o cliente:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o cliente' });
    }
  }

  async editarCliente(req, res) {
    try {
      const codigo = req.params.codigo;
      const cliente = req.body;

      const clienteExistente = await clienteModel.findOne({ codigo: codigo });
      if (!clienteExistente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      // Mantém a imagem existente se nenhuma nova imagem for enviada
      if (!req.file) {
        cliente.imagem = clienteExistente.imagem;
      } else {
        cliente.imagem = req.file.buffer; // Salva o conteúdo binário da nova imagem no campo "imagem" do cliente
      }

      // Gerar o hash da senha do cliente, se uma nova senha for fornecida
      if (cliente.senha) {
        const senhaHash = await bcryptjs.hash(cliente.senha, 10);
        cliente.senha = senhaHash;
      }

      const resultado = await clienteModel.findOneAndUpdate(
        { codigo: codigo },
        cliente,
        { new: true }
      );

      console.log('Cliente editado:', resultado);
      res.status(200).json(resultado);
    } catch (error) {
      console.log('Erro ao editar o cliente:', error);
      res.status(500).json({ error: 'Erro ao editar o cliente' });
    }
  }

  async retornarListaClientes(req, res) {
    try {
      const clientes = await clienteModel.find({});
      console.log('Lista de clientes:', clientes);
      res.status(200).json(clientes);
    } catch (error) {
      console.log('Erro ao retornar a lista de clientes:', error);
      res.status(500).json({ error: 'Erro ao retornar a lista de clientes' });
    }
  }

  async retornarClientePorCodigo(req, res) {
    try {
      const codigo = req.params.codigo;
      const cliente = await clienteModel.findOne({ codigo: codigo });
      if (cliente) {
        console.log('Cliente encontrado:', cliente);
        res.status(200).json(cliente);
      } else {
        console.log('Cliente não encontrado');
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (error) {
      console.log('Erro ao retornar o cliente:', error);
      res.status(500).json({ error: 'Erro ao retornar o cliente' });
    }
  }
}

module.exports = new ClienteController();
