import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Card({ produto }) {
  const { imagem } = produto;
  
  const imageStyle = {
    width: '100%',
    height: '200px', // Defina a altura desejada para a imagem
    objectFit: 'cover', // Adicione o objectFit: cover para ajustar a imagem
  };

  return (
    <div className="card m-1 p-0" style={{ width: '18rem' }}>
      {imagem ? (
        <img
          src={`data:image/png;base64,${btoa(
            new Uint8Array(imagem.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )}`}
          alt=""
          style={imageStyle}
        />
      ) : (
        <div className="card-img-top" style={{ height: '200px', backgroundColor: 'gray' }}></div>
      )}
      <div className="card-body">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">Preço: R${produto.preco}</p>
        <Link to={`/buscar/${produto.codigo}`}>
          <button className="btn btn-sm btn-primary">Ver detalhes</button>
        </Link>
      </div>
    </div>
  );
}


function App() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/produto/listar');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOrdenacaoChange = (event) => {
    setOrdenacao(event.target.value);
  };

  const filteredProdutos = produtos.filter((produto) => {
    const nomeIncluiTermo = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return nomeIncluiTermo;
  }).sort((a, b) => {
    if (ordenacao === 'preco-menor') {
      return a.preco - b.preco;
    } else if (ordenacao === 'preco-maior') {
      return b.preco - a.preco;
    } else if (ordenacao === 'nome') {
      return a.nome.localeCompare(b.nome);
    }
    return 0;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mb-3">
          <input type="text" placeholder="Pesquisar produtos" onChange={handleSearchChange} value={searchTerm} />
          <select value={ordenacao} onChange={handleOrdenacaoChange}>
            <option value="">Ordenar por</option>
            <option value="Preco-menor">Preço (menor para maior)</option>
            <option value="Preco-maior">Preço (maior para menor)</option>
            <option value="Alfabetica">Nome</option>
          </select>
        </div>
        {filteredProdutos.length > 0 ? (
          filteredProdutos.map((produto) => <Card key={produto._id} produto={produto} />)
        ) : (
          <div className="col-md-12 mb-3">Nenhum produto encontrado.</div>
        )}
      </div>
    </div>
  );
}

export default App;
