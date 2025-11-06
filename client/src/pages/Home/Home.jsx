import React, { useState } from 'react';
import './Home.css';
import logo from '../../assets/logo.png'; // Reutilizando o logo

// PLACEHOLDERS - Você precisará adicionar essas imagens
import heroImg from '../../assets/hero-pixel.png'; // Imagem do seu herói
import questGiverImg from '../../assets/quest-giver.png'; // Imagem do "NPC"
// A imagem 'fundo_code_journey.png' é carregada pelo CSS

const Home = () => {
  // 1. Estado para controlar a visibilidade do pop-up
  const [showIntro, setShowIntro] = useState(true);

  // 2. Função para fechar o pop-up
  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  return (
    <div className="home-container">
      {/* === O POP-UP DE INTRODUÇÃO === */}
      {/* Ele só aparece se 'showIntro' for verdadeiro */}
      {showIntro && (
        <div className="intro-modal-overlay">
          <div className="intro-modal-content">
            <div className="intro-text-area">
              <p>
                Desperte, Herói! Seu destino o aguarda no Mundo de Compilação.
              </p>
              <p>
                A fronteira entre o código e o caos está ameaçada, e apenas os
                Mestres em JavaScript podem restaurar a ordem. Sua jornada seguirá
                pelos portais que levam a campos de batalha.
              </p>
              <p>
                A cada Desafio de programação que você solucionar com sucesso,
                você atacará o Oponente, ganhando Pontos de Experiência para
                evoluir seu Personagem e Insígnias que provam sua maestria. Se
                falhar, o monstro irá contra-atacar, forçando você a refinar seu
                código.
              </p>
              <p>
                Conclua todos os módulos, adquira novas habilidades, e garanta seu
                lugar entre os melhores no Ranking Global!
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
        {/* Para os ícones, você usará a 'react-icons' no futuro */}
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
        {/* As imagens são posicionadas pelo CSS */}
        <img src={heroImg} alt="Herói" className="scene-hero" />
        <img
          src={questGiverImg}
          alt="Mestre do Jogo"
          className="scene-quest-giver"
        />
      </main>
    </div>
  );
};

export default Home;