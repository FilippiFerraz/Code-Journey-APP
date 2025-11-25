// client/src/pages/LevelSelection/LevelSelection.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LevelSelection.css';

// Assets
import logo from '../../assets/logo.png';
import heroStanding from '../../assets/hero-pixel.png'; // Crie esta imagem!
import swords from '../../assets/swords.png';
// import dungeonBg from '../../assets/dungeon_bg.png'; // Usado no CSS

const LevelSelection = () => {
  const navigate = useNavigate();

  // Dados simulados dos níveis
  const levels = [
    { id: 1, label: 'Desafio 1', locked: false },
    { id: 2, label: 'Desafio 2', locked: true },
    { id: 3, label: 'Desafio 3', locked: true },
    { id: 4, label: 'Desafio 4', locked: true },
    { id: 5, label: 'Desafio 5', locked: true },
    { id: 6, label: 'Desafio 6', locked: true },
  ];

  // Função ao clicar no nível
  const handleLevelClick = (level) => {
    if (level.locked) {
      alert('Este nível está bloqueado! Complete o anterior para desbloquear.');
      return;
    }
    
   if (level.id === 1) {
        navigate('/missao-intro');
    }
  };

  // Função para fechar (voltar para dificuldade)
  const handleClose = () => {
    navigate('/dificuldade');
  };

  return (
    <div className="level-page-container">
      
      {/* Cabeçalho */}
      <header className="level-header">
        <h1 className="level-header-title">DESAFIOS - ATO 1</h1>
        <img src={logo} alt="Logo" style={{ height: '30px' }} />
      </header>

      {/* Topo: Cena do Herói */}
      <div className="top-scene-container">
        {/* O fundo é definido no CSS */}
        <img src={heroStanding} alt="Herói" className="hero-standing" />
      </div>

      {/* Baixo: Seleção */}
      <div className="bottom-selection-container">
        
        {/* Placa de Madeira */}
        <div className="wooden-board">
          
          {/* Título da Placa */}
          <div className="board-title-plank">DESAFIOS</div>
          
          {/* Botão Fechar */}
          <div className="close-btn" onClick={handleClose}>X</div>

          {/* Grid de Níveis */}
          <div className="levels-grid">
            {levels.map((level) => (
              <button
                key={level.id}
                className={`level-btn ${level.locked ? 'locked' : 'active'}`}
                onClick={() => handleLevelClick(level)}
              >
                {level.locked ? (
                    <>
                     DE... <span className="lock-icon">🔒</span> {level.id}
                    </>
                ) : (
                    level.label
                )}
              </button>
            ))}
          </div>

          {/* Espadas Decorativas */}
          <img src={swords} alt="Espadas" className="board-swords" />
        </div>
      </div>

      {/* Rodapé (Igual às outras telas) */}
      <footer className="app-footer">
        <Link to="#" className="footer-icon-link">🏆</Link>
        <Link to="#" className="footer-icon-link">👤</Link>
        <Link to="/home" className="footer-icon-link active">🏠</Link>
        <Link to="#" className="footer-icon-link">⚙️</Link>
      </footer>

    </div>
  );
};

export default LevelSelection;