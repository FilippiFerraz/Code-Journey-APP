// client/src/pages/ForgotPassword/ForgotPassword.jsx

import React from 'react';
import logo from '../../assets/logo.png'; // Importa o logo
import '../Login/Login.css'; // !!! IMPORTANTE: Reutilizando o CSS do Login

const ForgotPassword = () => {
  return (
    <div className="login-page-container"> {/* Reutiliza a classe para o fundo */}
      <div className="login-card">
        {/* Usamos a classe 'login-form' para o padding interno */}
        <div className="login-form">
          <h2 className="form-title">Esqueceu a Senha?</h2>
          <p className="form-subtitle">
            Informe seu Email para o código de verificação ser enviado
          </p>

          <form>
            <div className="input-group">
              <label htmlFor="email">Seu email:</label>
              <input
                type="email"
                id="email"
                placeholder="Digite o email"
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
      <img src={logo} alt="Code Journey Logo" className="page-logo" />
    </div>
  );
};

export default ForgotPassword;