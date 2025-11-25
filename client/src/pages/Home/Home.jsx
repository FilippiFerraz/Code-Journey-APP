// client/src/pages/Home/Home.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png';

// Importação apenas do Portal (Os outros elementos já estão no background)
import portalImg from '../../assets/portal_codej.png';

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  const handlePortalClick = () => {
    navigate('/dificuldade');
  };

  return (
    <div className="home-container">
      {/* === O POP-UP DE INTRODUÇÃO === */}
      {showIntro && (
        <div className="intro-modal-overlay">
          <div className="intro-modal-content">
            <div className="intro-text-area">
              <p>
                Desperte, Herói! Seu destino o aguarda no Mundo de Compilação.
              </p>
              <p>
                A fronteira entre o código e o caos está ameaçada, e apenas os
                Mestres em JavaScript podem restaurar a ordem. Sua jornada
                seguirá pelos portais que levam a campos de batalha.
              </p>
              <p>
                A cada Desafio de programação que você solucionar com sucesso,
                você atacará o Oponente, ganhando Pontos de Experiência para
                evoluir seu Personagem e Insígnias que provam sua maestria.
              </p>
              <p>
                Conclua todos os módulos, adquira novas habilidades, e garanta
                seu lugar entre os melhores no Ranking Global!
              </p>
            </div>
            <button onClick={handleCloseIntro} className="intro-button">
              AVANTE!
            </button>
          </div>
        </div>
      )}

      {/* === CABEÇALHO DA PÁGINA === */}
      <header className="home-header">
        <h1 className="home-title">HOME</h1>
        <img src={logo} alt="Code Journey Logo" className="header-logo" />
      </header>

      {/* === BARRA DE STATS === */}
      <div className="stats-bar">
        <div className="stat-item">
          <span>⚔️</span> 7
        </div>
        <div className="stat-item">
          <span>👕</span> 2
        </div>
        <div className="stat-item">
          <span>❤️</span> 5
        </div>
      </div>

      {/* === CENA PRINCIPAL DO JOGO === */}
      <main className="game-scene">
        
        {/* Apenas o Portal Funcional é renderizado aqui.
            O fundo, herói e caminhos vêm da imagem CSS 'mapa_atos.png' */}
        
        <img
          src={portalImg}
          alt="Portal Ato 1"
          className="scene-portal"
          onClick={handlePortalClick}
        />
      </main>

      {/* === RODAPÉ === */}
      <footer className="app-footer">
        <Link to="#" className="footer-icon-link">🏆</Link>
        <Link to="#" className="footer-icon-link">👤</Link>
        <Link to="/home" className="footer-icon-link active">🏠</Link>
        <Link to="#" className="footer-icon-link">⚙️</Link>
      </footer>

    </div>
  );
};

export default Home;