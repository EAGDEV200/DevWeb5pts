const clienteModel = require('../models/clienteModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

    async login(req, res) {
        const { email, senha } = req.body;
        const cliente = await clienteModel.findOne({ 'email': email }).select('+senha');
        
        if (!cliente) {
          return res.status(400).send({ error: 'Usuário não encontrado!' });
        }
      
        if (!await bcryptjs.compare(senha, cliente.senha)) {
          return res.status(400).send({ error: 'Senha inválida!' });
        }
      
        await auth.incluirToken(cliente);
        
        // Prepara a resposta enviada pelo Postman
        const response = {
          nomeCompleto: cliente.nomeCompleto,
          endereco: cliente.endereco,
          telefone: cliente.telefone,
          cpf: cliente.cpf,
          email: cliente.email,
          token: cliente.token // Inclui o token na resposta
        };
      
        res.status(200).json(response);
      }
    }

module.exports = new LoginController();
