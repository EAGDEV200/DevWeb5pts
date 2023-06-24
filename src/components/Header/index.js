import "./header.css";
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isCadastroPage = location.pathname === '/Cadastro';

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li> <Link className="btn btn-outline-dark" to='/'>Home</Link> </li>
          <li> <Link className="btn btn-outline-dark" to='/planos'>Planos</Link> </li>
          <li> <Link className="btn btn-outline-dark" to='/sobre/meunome'>Sobre</Link> </li>
            <li> <Link to="/perfil" className="btn btn-outline-dark">Meu Perfil</Link></li>
            <li>  <Link to="/perfil" className="btn btn-outline-dark">Meu Perfil</Link></li>
        </ul>

        {isCadastroPage ? null : (
          <div className="col-md-3 text-end">
            <Link to="/Cadastro" className="btn btn-dark">Cadastrar</Link>
            <Link to="/Cadastro" className="btn btn-warning">Logar</Link>
            
            
          </div>
        )}
      </header>
    </div>
  );
}
