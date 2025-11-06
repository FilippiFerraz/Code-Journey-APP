import React from 'react';
import logo from '../../assets/logo.png';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom'; // 1. Importe o 'useNavigate'

const ForgotPassword = () => {
  const navigate = useNavigate(); // 2. Inicialize o hook

  // 3. Crie a função de submit
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    // LÓGICA DO TCC:
    // 1. Pegue o email do <input>
    // 2. Envie este email para sua API no backend
    // 3. Se a API retornar "sucesso"...
    // 4. Navegue para a próxima página:
    navigate('/verificar-codigo');
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-form">
          <h2 className="form-title">Esqueceu a Senha?</h2>
          <p className="form-subtitle">
            Informe seu Email para o código de verificação ser enviado
          </p>

          {/* 4. Use a tag <form> e ligue o onSubmit */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Seu email:</label>
              <input
                type="email"
                id="email"
                placeholder="Digite o email"
                autoFocus
                required // Boa prática para não enviar vazio
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