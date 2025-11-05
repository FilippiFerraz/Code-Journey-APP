// client/src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx'; // Importe sua página de Login
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
// Em breve: import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      {/* A Rota "/" (página inicial) vai renderizar o componente de Login */}
      <Route path="/" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      {/* Exemplo de como você adicionará novas rotas: */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/cadastro" element={<Register />} /> */}
    </Routes>
  );
}

export default App;