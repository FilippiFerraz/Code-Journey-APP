import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Importar useLocation e Link
import axios from 'axios';
import logo from '../../assets/logo.png';
import '../Login/Login.css'; // Usamos o mesmo CSS

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 1. Hook para pegar dados da navegação anterior
  
  // Extrai o email que foi passado de ForgotPassword.jsx
  // Se não houver email (acesso direto), usa uma string vazia como fallback
  const initialEmail = location.state?.email || ''; 

  // 2. Estados: Um para o código e um para o email (para exibir/usar no resend)
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(initialEmail); 
  
  // 3. Função de Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 4. Chamada à API para verificar o código
      const response = await axios.post(
        'http://localhost:8080/api/auth/verify-code',
        { email, code } // Envia o email e o código
      );

      alert(response.data.message);
      
      // 5. Sucesso: Navega para a tela de redefinição de senha, 
      //    levando o token de redefinição que a API retornou.
      navigate('/redefinir-senha', { 
          state: { 
              resetToken: response.data.resetToken, 
              email: email 
          } 
      });

    } catch (error) {
      console.error('Erro ao verificar código:', error);
      if (error.response && error.response.data) {
        alert('Erro: ' + error.response.data.message);
      } else {
        alert('Erro de conexão com o servidor.');
      }
    }
  };

  // 6. Função para reenviar o código
  const handleResendCode = async () => {
    if (!email) {
        alert('Por favor, volte e insira seu email na tela anterior.');
        return;
    }
    
    try {
        const response = await axios.post(
            'http://localhost:8080/api/auth/forgot-password',
            { email }
        );
        let message = response.data.message;

        if (response.data.debug_code) {
            message += `\n(DEBUG) Novo código: ${response.data.debug_code}`;
        }
        alert('Novo código solicitado. ' + message);
    } catch (error) {
        alert('Falha ao reenviar código.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-form">
          <h2 className="form-title">Verificação de Código</h2>
          <p className="form-subtitle">
            Um código de 6 dígitos foi enviado para: <br />
            <strong>{email || 'Nenhum email fornecido.'}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="code">Código de Verificação:</label>
              <input
                type="text"
                id="code"
                placeholder="Ex: 123456"
                autoFocus
                required
                maxLength="6"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            
            {/* NOVO: Link de Reenvio */}
            <div className="resend-link-container">
                 <Link to="#" className="resend-code-link" onClick={handleResendCode}>
                    Reenviar Código
                 </Link>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Verificar
            </button>
          </form>
        </div>
      </div>
      <img src={logo} alt="Code Journey Logo" className="page-logo" />
    </div>
  );
};

export default VerifyCode;