import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import Home from './pages/Home/Home.jsx';
import VerifyCode from './pages/VerifyCode/VerifyCode.jsx'; // 1. Importe o novo componente

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />

      {/* 2. Adicione a nova rota */}
      <Route path="/verificar-codigo" element={<VerifyCode />} />
    </Routes>
  );
}

export default App;