// server/server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080; // Porta diferente do React (5173)

// === Middlewares ===
app.use(cors()); // Permite requisições de origens diferentes (do seu frontend)
app.use(express.json()); // Permite o servidor entender JSON

// === Rotas ===
// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Code Journey está no ar! 🚀');
});

// === Iniciar o Servidor ===
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});