// client/src/pages/RewardScreen/RewardScreen.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RewardScreen.css';

// Assets
import logo from '../../assets/logo.png';
// Use 'arena_bg.png' se tiver o fundo vazio, ou 'battle_scene.png' se não tiver
import arenaBg from '../../assets/arena_bg.png'; 
import insignia from '../../assets/insignia_iniciado.png';

const RewardScreen = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guerreiro(a)');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.nome) {
        setUserName(parsedUser.nome);
      }
    }
  }, []);

  const handleContinue = () => {
    // Volta para a tela de seleção de níveis para escolher o próximo desafio
    navigate('/desafios');
  };

  return (
    <div className="reward-container">
      
      {/* Header */}
      <header className="mission-header">
        <h1 className="mission-header-title">Desafio 1</h1>
        <img src={logo} alt="Logo" style={{ height: '30px' }} />
      </header>

      {/* Cena Visual */}
      <div 
        className="reward-scene" 
        style={{ backgroundImage: `url(${arenaBg})` }}
      >
        {/* Banner Topo */}
        <div className="victory-banner-top">
          VITÓRIA ÉPICA! O CÓDIGO VENCEU A FERA!
        </div>

        {/* Insígnia Central */}
        <div className="insignia-container">
            <img src={insignia} alt="Insígnia O Iniciado" className="insignia-img" />
        </div>

        {/* Banner Base */}
        <div className="victory-banner-bottom">
          Insígnia "O Iniciado":<br/>
          Prova do seu primeiro feito.
        </div>
      </div>

      {/* Card de Narrativa */}
      <div className="reward-narrative-section">
        <div className="reward-card">
          <p className="reward-text">
            Guerreiro(a) <strong>[{userName}]</strong>, sua primeira Palavra de Comando foi um sucesso esmagador! 
            O Dragão Escarlate Vermelho foi atordoado e forçado a recuar, provando o poder da sua sintaxe.
            <br/><br/>
            Você dominou o conceito de <strong>Saída de Dados</strong> e deu o passo mais importante: o começo!
          </p>

          <button className="btn-avante" onClick={handleContinue}>
            AVANTE!
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>🏆</Link>
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>👤</Link>
        <Link to="/home" style={{fontSize: '28px', textDecoration:'none'}}>🏠</Link>
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>⚙️</Link>
      </footer>

    </div>
  );
};

export default RewardScreen;