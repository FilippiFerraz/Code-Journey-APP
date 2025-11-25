// client/src/App.jsx (Atualizado)
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import VerifyCode from './pages/VerifyCode/VerifyCode.jsx';
import Home from './pages/Home/Home.jsx';
import DifficultySelection from './pages/DifficultySelection/DifficultySelection.jsx';
// 1. Importe a nova tela
import LevelSelection from './pages/LevelSelection/LevelSelection.jsx';
import MissionIntro from './pages/MissionIntro/MissionIntro.jsx';
import GameLevel from './pages/GameLevel/GameLevel.jsx';
import RewardScreen from './pages/RewardScreen/RewardScreen.jsx'; 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/verificar-codigo" element={<VerifyCode />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dificuldade" element={<DifficultySelection />} />
      <Route path="/game/level/1" element={<GameLevel />} />
      <Route path="/recompensa/1" element={<RewardScreen />} />
      
      {/* 2. Nova Rota */}
      <Route path="/desafios" element={<LevelSelection />} />
      <Route path="/missao-intro" element={<MissionIntro />} />
    </Routes>
  );
}

export default App;