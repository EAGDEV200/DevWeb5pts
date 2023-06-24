import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Planos from './pages/planos';
import Sobre from './pages/sobre';
import Cadastro from './pages/Cadastro/Cadastro';
import ProdutosDetail from './pages/Cadastro/ProdutosDetail';
import Login from './pages/Login';

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/sobre/:name" element={<Sobre />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/buscar/:codigo" element={<ProdutosDetail />} />
      <Route path="/login" element={<Login />}/>
      <Route path="*" element={<h1>Página Não Encontrada!</h1>} />
    </Routes>
  );
}