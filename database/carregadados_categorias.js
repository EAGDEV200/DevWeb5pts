require('./mongodb');
const categoriaModel = require('../models/categoriaModel');
const categorias = require('./categorias.json');

async function carregarDados() {
  try {
    await categoriaModel.deleteMany({});
    for (const categoria of categorias) {
      await categoriaModel.create(categoria);
    }
    console.log('Carga de categorias concluída!');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregarDados();
