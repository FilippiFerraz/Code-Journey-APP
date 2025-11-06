import React from 'react';
import { Link } from 'react-router-dom'; // Usaremos para o link "reenviar"
import logo from '../../assets/logo.png';
import '../Login/Login.css'; // Reutilizando o CSS do Login!

const VerifyCode = () => {
  return (
    <div className="login-page-container">
      {' '}
      {/* Reutiliza o fundo */}
      <div className="login-card">
        {' '}
        {/* Reutiliza o card branco */}
        <div className="login-form">
          {' '}
          {/* Reutiliza o padding */}{' '}
          <h2 className="form-title">Código de verificação</h2>
          <p className="form-subtitle">
            Seu código de verificação foi enviado para seu email:
          </p>
          <form>
            <div className="input-group">
              <label htmlFor="code">Código de verificação:</label>
              <input
                type="text"
                id="code"
                placeholder="Digite o código"
                autoFocus
              />
            </div>

            {/* Container para o link "Reenviar" */}
            <div className="resend-link-container">
              <Link to="#" className="resend-code-link">
                reenviar código
              </Link>
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

export default VerifyCode;