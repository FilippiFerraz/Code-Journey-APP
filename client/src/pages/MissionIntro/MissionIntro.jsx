import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MissionIntro.css';

// Assets
import logo from '../../assets/logo.png';
import heroImg from '../../assets/hero-pixel.png'; 
import villageBg from '../../assets/village_bg.png'; 
import battleScene from '../../assets/battle_scene.png';

const MissionIntro = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guerreiro(a)');
  
  // 0 = Vila Intro
  // 1 = Vila Dragão
  // 2 = Arena Diálogo (Mestre)
  // 3 = Arena Instrução Geral
  // 4 = Arena Missão Específica (NOVO!)
  const [storyStep, setStoryStep] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.nome) {
        setUserName(parsedUser.nome);
      }
    }
  }, []);

  const handleNextStep = () => {
    // Agora vai até o passo 4
    if (storyStep < 4) {
      setStoryStep(storyStep + 1);
    } else {
      // AQUI SERÁ O REDIRECIONAMENTO FINAL PARA O EDITOR
      navigate('/game/level/1');
      // navigate('/game/editor/1'); 
    }
  };

  return (
    <div className="mission-container">
      
      <header className="mission-header">
        <h1 className="mission-header-title">Desafio 1</h1>
        <img src={logo} alt="Logo" style={{ height: '30px' }} />
      </header>

      {/* Cena Superior */}
      <div className="scene-container">
        
        {/* Título Flutuante (Apenas no passo 0) */}
        {storyStep === 0 && (
          <div className="mission-title-card">
            <div className="mission-label">Título da Missão:</div>
            <div className="mission-name">O Rugido do<br/>Dragão Escarlate</div>
          </div>
        )}

        {/* Passos 0 e 1: VILA */}
        {storyStep < 2 && (
          <>
            <img src={villageBg} alt="Vila" className="scene-background-img" />
            <img src={heroImg} alt="Herói" className="hero-scene" />
          </>
        )}

        {/* Passos 2, 3 e 4: ARENA (Batalha) */}
        {storyStep >= 2 && (
            <img 
              src={battleScene} 
              alt="Cena de Batalha" 
              className="battle-scene-complete" 
            />
        )}

      </div>

      {/* Área Inferior (Narrativa) */}
      <div className="narrative-section">
        <div className="narrative-card">
          
          <p className="narrative-text">
            {storyStep === 0 && (
              <>
                <span className="highlight-name">{userName}</span>! Sua jornada
                começou na pacata Vila da Variável, mas a paz foi abruptamente
                quebrada.
              </>
            )}

            {storyStep === 1 && (
              <>
                Enquanto você avançava pela estrada de terra, um estrondo ecoou! 
                Você se deparou com a fera que aterroriza os iniciantes: 
                um jovem <strong>Dragão Escarlate</strong>.
              </>
            )}

            {storyStep === 2 && (
               <>
                O Dragão se posiciona, pronto para cuspir fogo, mas <span className="highlight-name">{userName}</span> lembra de uma fala típica de seu mestre: 
                "Não lute com ferro, lute com o intelecto! O Dragão teme a <strong>Palavra de Comando</strong>."
               </>
            )}

            {storyStep === 3 && (
               <>
                O Desafio é claro: Você deve <strong>forjar o código</strong> que declara sua presença. 
                Use o comando de saída de dados para que sua frase de guerra seja impressa na tela e amedronte a besta escarlate.
               </>
            )}

            {/* --- NOVO PASSO 4: MISSÃO FINAL --- */}
            {storyStep === 4 && (
               <>
                <strong style={{color: '#32cd32'}}>Missão:</strong> Imprima a seguinte frase no console para atordoar o Dragão Escarlate Vermelho:
                <br/><br/>
                "<strong style={{color: '#32cd32'}}>Eu sou {userName} e o poder do JavaScript me comanda!</strong>"
               </>
            )}
          </p>
          
          <button className="btn-avante" onClick={handleNextStep}>
            AVANTE!
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="app-footer">
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>🏆</Link>
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>👤</Link>
        <Link to="/home" style={{fontSize: '28px', textDecoration:'none'}}>🏠</Link>
        <Link to="#" style={{fontSize: '28px', textDecoration:'none'}}>⚙️</Link>
      </footer>

    </div>
  );
};

export default MissionIntro;