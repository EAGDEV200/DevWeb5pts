const clienteModel = require('../models/clienteModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Especifique o caminho onde deseja salvar as imagens
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Utilize o nome original do arquivo como nome de salvamento
  }
});

const upload = multer({ storage });

class ClienteController {
  async cadastrarCliente(req, res) {
    try {
      upload.single('imagem')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          console.log('Erro Multer:', err);
          return res.status(400).json({ error: 'Erro ao fazer o upload da imagem' });
        } else if (err) {
          console.log('Erro interno do servidor:', err);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        const cliente = req.body;
        cliente.imagem = req.file ? req.file.filename : '';

        const resultado = await clienteModel.create(cliente);
        console.log('Cliente cadastrado:', resultado);
        res.status(201).json(resultado);
      });
    } catch (error) {
      console.log('Erro ao cadastrar o cliente:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o cliente' });
    }
  }

  async editarCliente(req, res) {
    try {
      upload.single('imagem')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          console.log('Erro Multer:', err);
          return res.status(400).json({ error: 'Erro ao fazer o upload da imagem' });
        } else if (err) {
          console.log('Erro interno do servidor:', err);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        const codigo = req.params.codigo;
        const cliente = req.body;
        if (req.file) {
          cliente.imagem = req.file.filename;
        }

        const resultado = await clienteModel.findOneAndUpdate(
          { codigo: codigo },
          cliente,
          { new: true }
        ).select('+imagem');

        console.log('Cliente editado:', resultado);
        res.status(200).json(resultado);
      });
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
