import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GameLevel.css';

// Assets Comuns
import logo from '../../assets/logo.png';

// --- AS 3 IMAGENS DE CENA ---
// 1. Cena Normal (Parado)
import sceneIdle from '../../assets/battle_scene.png';
// 2. Cena de Ataque (Acertou)
import sceneAttack from '../../assets/hero_attack.png';
// 3. Cena de Derrota/Dragão Atacando (Errou)
import sceneDefeat from '../../assets/hero_defeat.png';

const GameLevel = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guerreiro');
  const [userCode, setUserCode] = useState('');

  // Estados de Controle
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  // Estado da Cena: 'idle' | 'attacking' | 'defeated'
  const [sceneState, setSceneState] = useState('idle');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.nome) {
        setUserName(parsedUser.nome);
      }
    }
  }, []);

  const handleCheckAnswer = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/game/check-code', {
        code: userCode
      });

      if (response.data.success) {
        // --- ACERTOU ---
        setIsCorrect(true);
        setSceneState('attacking'); // Troca para imagem de ataque
        setFeedbackMessage(response.data.message);
        setShowFeedback(true);
      }

    } catch (error) {
      // --- ERROU ---
      setIsCorrect(false);
      setSceneState('defeated'); // Troca para imagem de derrota
      
      if (error.response && error.response.data) {
        setFeedbackMessage(error.response.data.message);
      } else {
        setFeedbackMessage("Erro ao conectar com o servidor.");
      }
      setShowFeedback(true);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    if (isCorrect) {
      // Se acertou, vai para o próximo nível
      navigate('/recompensa/1');
      // navigate('/desafios'); 
    } else {
      // Se errou, volta para a imagem normal para tentar de novo
      setSceneState('idle');
    }
  };

  // --- Lógica para escolher qual imagem mostrar ---
  let currentSceneImage;
  if (sceneState === 'attacking') {
    currentSceneImage = sceneAttack;
  } else if (sceneState === 'defeated') {
    currentSceneImage = sceneDefeat;
  } else {
    currentSceneImage = sceneIdle;
  }

  return (
    <div className="game-container">
      <header className="mission-header">
        <h1 className="mission-header-title">Desafio 1</h1>
        <img src={logo} alt="Logo" style={{ height: '30px' }} />
      </header>

      {/* --- CENA DO JOGO --- */}
      <div className="game-scene">
        {/* Exibe a imagem única baseada no estado atual */}
        <img 
            src={currentSceneImage} 
            alt="Cena do Jogo" 
            className="full-scene-image" 
        />

        {/* Card Flutuante de Exemplo (Só aparece se não estiver no feedback) */}
        {!showFeedback && (
          <div className="example-card">
            <div className="example-title">Exemplo</div>
            <div className="code-example">
              <span className="highlight-syntax">console.log</span>
              ("Eu sou <strong>[{userName}]</strong> e o poder do JavaScript me comanda!");
            </div>
          </div>
        )}
      </div>

      {/* --- INPUT --- */}
      <div className="input-section">
        <div className="code-input-card">
          <label className="input-label">Digite aqui:</label>
          <textarea 
            className="code-textarea"
            placeholder='console.log("...")'
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            spellCheck="false"
          />
          <button className="btn-submit" onClick={handleCheckAnswer}>
            AVANTE!
          </button>
        </div>
      </div>

      {/* --- MODAL DE FEEDBACK --- */}
      {showFeedback && (
        <div className="feedback-overlay">
            <div className="feedback-card">
                <div className={`feedback-header ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? 'Resposta Certa!' : 'Resposta ERRADA!'}
                </div>
                <div className="feedback-body">
                    <p>{feedbackMessage}</p>

                    {!isCorrect && (
                        <p style={{marginTop: '15px', fontSize: '14px'}}>
                            Era esperado:<br/>
                            <span className="highlight-feedback">
                                console.log("Eu sou {userName} e o poder do JavaScript me comanda!");
                            </span>
                        </p>
                    )}

                    <button className="btn-submit" onClick={handleCloseFeedback} style={{marginTop: '20px'}}>
                        {isCorrect ? 'CONTINUAR' : 'TENTAR NOVAMENTE'}
                    </button>
                </div>
            </div>
        </div>
      )}

      <footer className="app-footer">
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>🏆</Link>
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>👤</Link>
        <Link to="/home" style={{fontSize: '28px', textDecoration:'none'}}>🏠</Link>
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>⚙️</Link>
      </footer>
    </div>
  );
};

export default GameLevel;