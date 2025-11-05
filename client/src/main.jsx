// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter
import './index.css'; // Vamos manter os estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* O BrowserRouter agora "envolve" seu App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);