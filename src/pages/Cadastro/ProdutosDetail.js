import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ProdutoDetails() {
  const { codigo } = useParams();
  const [produto, setProduto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`http://localhost:3001/produto/buscar/${codigo}`);
        const data = await response.json();
        setProduto(data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    fetchProduto();
  }, [codigo]);

  if (!produto) {
    return <div>Carregando...</div>;
  }

  const { nome, descricao, preco, categoria, notaGeral, comentarios, imagem } = produto;

  const adicionarAoCarrinho = () => {
    const token = localStorage.getItem('token');

    if (token) {
      // Usuário autenticado, redirecionar para a página do carrinho
      navigate('/carrinho');
    } else {
      // Usuário não autenticado, redirecionar para a página de login
      navigate('/login');
    }
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  return (
    <div className="row">
      <div className="col-md-4">
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
          <div
            className="card-img-top"
            style={{ height: '200px', backgroundColor: 'gray' }}
          ></div>
        )}
      </div>
      <div className="col-md-8">
        <h1>{nome}</h1>
        <p>{descricao}</p>
        <p>Preço: R${preco}</p>
        <p>Categoria: {categoria}</p>
        <p>Quantidade: 1</p>
        <h3>Comentários:</h3>
        {comentarios.length > 0 ? (
          <ul>
            {comentarios.map((comentario) => (
              <li key={comentario._id}>
                <p>{comentario.texto}</p>
                <p>Nota: {comentario.nota}</p>
                <p>Nota Geral: {notaGeral}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem comentários</p>
        )}
        <Button variant="primary" className="mt-3" onClick={adicionarAoCarrinho}>
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}

export default ProdutoDetails;
