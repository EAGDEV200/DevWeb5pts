import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Cadastro() {
  const [codigo, setCodigo] = useState('');
  const [imagem, setImagem] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cartaoCredito, setCartaoCredito] = useState({ nome: '', numero: '', cvc: '' });
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/cliente/cadastrar', {
        codigo,
        imagem,
        nomeCompleto,
        endereco,
        telefone,
        cpf,
        cartaoCredito,
        email,
        senha
      });

      // Verificar a resposta da API e redirecionar para a página desejada
      if (response.status === 200) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      alert('Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="form-custom">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Código:
                <input
                  type="text"
                  className="form-control"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Imagem:
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Nome Completo:
                <input
                  type="text"
                  className="form-control"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Endereço:
                <input
                  type="text"
                  className="form-control"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Telefone:
                <input
                  type="text"
                  className="form-control"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                CPF:
                <input
                  type="text"
                  className="form-control"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Nome do Cartão de Crédito:
                <input
                  type="text"
                  className="form-control"
                  value={cartaoCredito.nome}
                  onChange={(e) => setCartaoCredito({ ...cartaoCredito, nome: e.target.value })}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Número do Cartão de Crédito:
                <input
                  type="text"
                  className="form-control"
                  value={cartaoCredito.numero}
                  onChange={(e) => setCartaoCredito({ ...cartaoCredito, numero: e.target.value })}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                CVC do Cartão de Crédito:
                <input
                  type="text"
                  className="form-control"
                  value={cartaoCredito.cvc}
                  onChange={(e) => setCartaoCredito({ ...cartaoCredito, cvc: e.target.value })}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Email:
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Senha:
                <input
                  type="password"
                  className="form-control"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </label>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
