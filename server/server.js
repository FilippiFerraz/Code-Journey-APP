const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8080;

// === "Banco de Dados" Simulado ===
const db_users = [];
const JWT_SECRET = 'minhachavesecretadotcc123456';

// === Middlewares ===
app.use(cors());
app.use(express.json());

// === Rotas Existentes (Auth) ===
app.get('/', (req, res) => {
  res.send('API do Code Journey está no ar! 🚀');
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const userExists = db_users.find((user) => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);
    const newUser = {
      id: db_users.length + 1,
      nome: nome,
      email: email,
      password: hashedPassword,
    };
    db_users.push(newUser);
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: { id: newUser.id, nome: newUser.nome, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = db_users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const isPasswordCorrect = await bcrypt.compare(senha, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }
    const token = jwt.sign(
      { id: user.id, nome: user.nome },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
      user: { id: user.id, nome: user.nome, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// ======================================================
// === (NOVO) ROTA DE VALIDAÇÃO DE DESAFIOS ===
// ======================================================

app.post('/api/game/check-code', (req, res) => {
  const { code } = req.body;
  const cleanCode = code.trim();

  // 1. Validações Básicas (já tínhamos)
  if (!cleanCode.startsWith('console.log')) {
    return res.status(400).json({ success: false, message: "O comando deve começar com 'console.log'." });
  }
  if (!cleanCode.endsWith(';')) {
    return res.status(400).json({ success: false, message: "Faltou o ponto e vírgula ';' no final." });
  }

  // 2. Extrair o texto de dentro (Regex de Captura)
  // Esse regex pega o que está dentro das aspas e coloca na variável 'match'
  const match = cleanCode.match(/^console\.log\s*\(\s*"(.*)"\s*\)\s*;$/);

  if (!match) {
    return res.status(400).json({ 
      success: false, 
      message: 'Sintaxe inválida. Certifique-se de usar: console.log("Texto");' 
    });
  }

  // A parte capturada (o texto dentro das aspas) fica no índice 1
  const textoDigitado = match[1]; 

  // 3. VALIDAR A FRASE ESPECÍFICA (O que você pediu agora)
  // Verificamos se começa com "Eu sou" E se termina com a frase de poder.
  // Fazemos assim para aceitar qualquer nome no meio.
  const fraseCorretaParte1 = "Eu sou";
  const fraseCorretaParte2 = "e o poder do JavaScript me comanda!";

  if (!textoDigitado.startsWith(fraseCorretaParte1) || !textoDigitado.includes(fraseCorretaParte2)) {
      return res.status(400).json({
          success: false, // Corrigido 'sucess' para 'success'
          message: 'A frase está incorreta! Ela deve ser: "Eu sou [Seu Nome] e o poder do JavaScript me comanda!"' 
      });
  }

  // 4. Sucesso Total
  return res.status(200).json({ 
    success: true, 
    message: "SINTAXE E FRASE PERFEITAS! O Dragão foi derrotado!" 
  });
});

// === Iniciar ===
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});