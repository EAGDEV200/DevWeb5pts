import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function Autentica() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/login', { email, senha });
      const { token, cliente } = response.data;

      if (token && cliente) {
        alert(`Token gerado para o usuário ${cliente.nome}`);
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        alert('Falha na autenticação. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Ocorreu um erro ao realizar o login. Por favor, tente novamente.');
    }

    setEmail('');
    setSenha('');
  }

  return (
    <div className="container text-center">
      <div className="row">
        <div className="form-custom">
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <p>Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}
