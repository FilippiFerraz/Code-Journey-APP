import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../../assets/logo.png';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate(); // Hook para navegar

  // --- Estados para o Formulário de LOGIN ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // --- Estados para o Formulário de CADASTRO ---
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // --- Função de Submit do CADASTRO (existente) ---
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const registerData = {
      nome: registerName,
      email: registerEmail,
      senha: registerPassword,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        registerData
      );
      alert(response.data.message);
      setActiveTab('login');
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (error) {
      console.error('Erro no cadastro!', error);
      if (error.response && error.response.data) {
        alert('Erro: ' + error.response.data.message);
      } else {
        alert('Erro ao tentar cadastrar.');
      }
    }
  };

  // --- (NOVA) Função de Submit do LOGIN ---
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento

    const loginData = {
      email: loginEmail,
      senha: loginPassword,
    };

    try {
      // 1. Chamar a API de login
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        loginData
      );

      // 2. (SUCESSO) Salvar o token no localStorage
      localStorage.setItem('token', response.data.token);

      // Opcional: Salvar os dados do usuário também
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 3. Redirecionar para a página Home
      alert(response.data.message); // "Login bem-sucedido!"
      navigate('/home'); // <-- A MÁGICA ACONTECE AQUI
    } catch (error) {
      // 4. Se der erro (usuário não existe, senha errada)
      console.error('Erro no login!', error);
      if (error.response && error.response.data) {
        alert('Erro: ' + error.response.data.message);
      } else {
        alert('Erro ao tentar fazer login.');
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Navegação das Abas */}
        <div className="tab-nav">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            ENTRAR
          </button>
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            CADASTRAR
          </button>
        </div>

        {/* === Formulário de Login (AGORA FUNCIONAL) === */}
        {activeTab === 'login' && (
          <form className="login-form" onSubmit={handleLoginSubmit}>
            {' '}
            {/* <-- LIGADO AQUI */}
            <div className="input-group">
              <label htmlFor="login-email">Email:</label>
              <input
                type="email"
                id="login-email"
                placeholder="seuemai@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Senha:</label>
              <input
                type="password"
                id="login-password"
                placeholder="****************"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <Link to="/esqueci-senha" className="forgot-password">
              Esqueceu a senha?
            </Link>
            <button type="submit" className="btn btn-primary">
              ENTRAR E COMEÇAR
            </button>
          </form>
        )}

        {/* === Formulário de Cadastro === */}
        {activeTab === 'register' && (
          <form className="login-form" onSubmit={handleRegisterSubmit}>
            <div className="input-group">
              <label htmlFor="register-name">Nome:</label>
              <input
                type="text"
                id="register-name"
                placeholder="Seu Username"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="register-email">Email:</label>
              <input
                type="email"
                id="register-email"
                placeholder="seuemai@gmail.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="register-password">Senha:</label>
              <input
                type="password"
                id="register-password"
                placeholder="****************"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              CRIAR CONTA
            </button>
          </form>
        )}
      </div>

      {/* ... (Resto do JSX, logins sociais e logo, sem mudanças) ... */}
      <div className="social-login-card">
        <div className="divider">
          <span>Ou continue com:</span>
        </div>
        <div className="social-buttons">
          <button className="btn btn-social google">
            <span className="icon">G</span> Google
          </button>
          <button className="btn btn-social facebook">
            <span className="icon">f</span> Facebook
          </button>
        </div>
      </div>
      <img src={logo} alt="Code Journey Logo" className="page-logo" />
    </div>
  );
};

export default Login;