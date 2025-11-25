// client/src/pages/DifficultySelection/DifficultySelection.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importamos o useNavigate
import './DifficultySelection.css';

// Importação de Assets
import logo from '../../assets/logo.png';
import swordsImg from '../../assets/swords.png'; 

const DifficultySelection = () => {
  // 2. Inicializamos o hook de navegação
  const navigate = useNavigate();

  const handleDifficultySelect = (mode) => {
    // Aqui você pode salvar a dificuldade escolhida no localStorage se quiser
    // Ex: localStorage.setItem('difficulty', mode);
    
    console.log(`Modo selecionado: ${mode}`);
    
    // 3. Redireciona para a tela de seleção de níveis (Desafios)
    navigate('/desafios');
  };

  return (
    <div className="difficulty-page-container">
      
      {/* === CABEÇALHO "ATO 1" === */}
      <header className="ato-header">
        <h1 className="ato-title">ATO 1</h1>
        <img src={logo} alt="Code Journey Logo" className="header-logo-small" />
      </header>

      {/* === CONTEÚDO PRINCIPAL (COM BACKGROUND) === */}
      <main className="main-content-bg">
        
        {/* === CARD CENTRAL ROXO === */}
        <div className="difficulty-card">
          <h2 className="difficulty-title">Qual modo deseja jogar?</h2>
          <div className="divider-line"></div>

          {/* Botões */}
          <div className="difficulty-buttons-row">
            <button 
                className="btn-difficulty"
                onClick={() => handleDifficultySelect('Iniciante')}
            >
                Iniciante
            </button>
            <button 
                className="btn-difficulty"
                onClick={() => handleDifficultySelect('Guerreiro')}
            >
                Guerreiro
            </button>
          </div>

          {/* Imagem das Espadas Cruzadas */}
          <img src={swordsImg} alt="Espadas Cruzadas" className="swords-image" />
        </div>
      </main>

      {/* === RODAPÉ (NAVBAR) === */}
      <footer className="app-footer">
        <Link to="#" className="footer-icon-link">
            🏆 {/* Ranking */}
        </Link>
        <Link to="#" className="footer-icon-link">
            👤 {/* Perfil */}
        </Link>
        {/* O ícone da Home tem a classe 'active' pois é a seção principal */}
        <Link to="/home" className="footer-icon-link active">
            🏠 {/* Home */}
        </Link>
        <Link to="#" className="footer-icon-link">
            ⚙️ {/* Configurações */}
        </Link>
      </footer>

    </div>
  );
};

export default DifficultySelection;