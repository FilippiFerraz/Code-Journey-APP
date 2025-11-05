// client/src/pages/Login/Login.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Login.css';
import logo from '../../assets/logo.png'; // Caminho relativo que corrigimos

const Login = () => {
  // Estado para controlar qual aba está ativa: 'login' ou 'register'
  const [activeTab, setActiveTab] = useState('login');

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

        {/* === Formulário de Login (Existente) === */}
        {activeTab === 'login' && (
          <form className="login-form">
            <div className="input-group">
              <label htmlFor="login-email">Email:</label> {/* Mudei o placeholder e o label */}
              <input
                type="email"
                id="login-email"
                placeholder="seuemai@gmail.com"
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Senha:</label>
              <input
                type="password"
                id="login-password"
                placeholder="****************"
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

        {/* === (NOVO) Formulário de Cadastro === */}
        {activeTab === 'register' && (
          <form className="login-form"> {/* Reutiliza a classe 'login-form' para o padding */}
            <div className="input-group">
              <label htmlFor="register-name">Nome:</label>
              <input
                type="text"
                id="register-name"
                placeholder="Seu Username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="register-email">Email:</label>
              <input
                type="email"
                id="register-email"
                placeholder="seuemai@gmail.com"
              />
            </div>
            <div className="input-group">
              <label htmlFor="register-password">Senha:</label>
              <input
                type="password"
                id="register-password"
                placeholder="****************"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              CRIAR CONTA
            </button>
          </form>
        )}
      </div>

      {/* Cartão de Login Social (Sem mudanças) */}
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

      {/* Logo (Sem mudanças) */}
      <img src={logo} alt="Code Journey Logo" className="page-logo" />
    </div>
  );
};

export default Login;