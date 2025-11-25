import React, { useState } from 'react'; // Importar useState
import logo from '../../assets/logo.png';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); // 1. NOVO: Estado para o e-mail

  // 2. NOVO: Função de submit atualizada
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 3. Chamada à API para iniciar o processo
      const response = await axios.post(
        'http://localhost:8080/api/auth/forgot-password',
        { email } // Envia o email
      );

      // Em produção, a mensagem seria genérica por segurança.
      // Aqui, vamos usar a mensagem de debug se estiver disponível.
      let message = response.data.message;

      if (response.data.debug_code) {
          // AVISO: Mostramos o código aqui APENAS para fins de teste no TCC.
          message += `\n(DEBUG) Use o código: ${response.data.debug_code}`;
      }
      
      alert(message);
      
      // 4. Se a API retornar sucesso (status 200), navegamos para a próxima tela,
      // levando o e-mail para que a tela de verificação já saiba qual e-mail usar.
      navigate('/verificar-codigo', { state: { email: email } });
      
    } catch (error) {
      console.error('Erro ao solicitar código:', error);
      if (error.response && error.response.data) {
        alert('Erro: ' + error.response.data.message);
      } else {
        alert('Erro de conexão com o servidor.');
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-form">
          <h2 className="form-title">Esqueceu a Senha?</h2>
          <p className="form-subtitle">
            Informe seu Email para o código de verificação ser enviado
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Seu email:</label>
              <input
                type="email"
                id="email"
                placeholder="Digite o email"
                autoFocus
                required
                value={email} // 5. Ligar o estado ao input
                onChange={(e) => setEmail(e.target.value)} // 6. Atualizar o estado
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