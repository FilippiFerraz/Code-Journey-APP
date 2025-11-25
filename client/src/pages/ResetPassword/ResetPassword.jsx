import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import '../Login/Login.css'; // Reutilizando o CSS de Login

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Pega o token de redefinição passado pela tela de verificação
  const resetToken = location.state?.resetToken;
  const email = location.state?.email; // O email é útil para feedback
  
  // 2. Estados para a nova senha
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redireciona se não houver token (acesso direto à URL)
  if (!resetToken) {
    alert('Erro: Token de redefinição ausente. Por favor, comece o processo novamente.');
    navigate('/esqueci-senha');
    return null; // Não renderiza nada se não houver token
  }

  // 3. Função de Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação frontend de que as senhas são iguais
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    try {
      // 4. Chamada à API para redefinir a senha
      const response = await axios.post(
        'http://localhost:8080/api/auth/reset-password',
        { 
          resetToken, 
          newPassword // Envia o token e a nova senha
        } 
      );

      alert(response.data.message + ' Agora faça login.');
      
      // 5. Sucesso: Redireciona para a tela de Login
      navigate('/'); 

    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      if (error.response && error.response.data) {
        alert('Erro: ' + error.response.data.message);
      } else {
        alert('Erro de conexão com o servidor. Verifique o console do backend.');
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-form">
          <h2 className="form-title">Redefinir Senha</h2>
          <p className="form-subtitle">
            Defina uma nova senha para {email}.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="new-password">Nova Senha:</label>
              <input
                type="password"
                id="new-password"
                placeholder="Digite a nova senha"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="confirm-password">Confirmar Senha:</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirme a nova senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Redefinir
            </button>
          </form>
        </div>
      </div>
      <img src={logo} alt="Code Journey Logo" className="page-logo" />
    </div>
  );
};

export default ResetPassword;