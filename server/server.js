const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Usado para comparar senhas
const jwt = require('jsonwebtoken'); // (NOVO) Para criar tokens

const app = express();
const PORT = 8080;

// === "Banco de Dados" Simulado (em memória) ===
const db_users = [];

// === (NOVO) Chave Secreta para o JWT ===
// Em um projeto real, isso estaria em um arquivo .env
const JWT_SECRET = 'minhachavesecretadotcc123456';

// === Middlewares ===
app.use(cors());
app.use(express.json());

// === Rotas ===

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Code Journey está no ar! 🚀');
});

// Rota de Cadastro (existente)
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
    console.log('Novo usuário cadastrado:', newUser);
    console.log('Todos os usuários:', db_users);
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: { id: newUser.id, nome: newUser.nome, email: newUser.email },
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// === (NOVA) ROTA DE LOGIN ===
app.post('/api/auth/login', async (req, res) => {
  try {
    // 1. Pegar email e senha do formulário
    const { email, senha } = req.body;

    // 2. Encontrar o usuário no "banco"
    const user = db_users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // 3. Comparar a senha digitada com a senha criptografada
    const isPasswordCorrect = await bcrypt.compare(senha, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Senha inválida.' }); // 401 = Não autorizado
    }

    // 4. (SUCESSO) Gerar um Token JWT
    // O token contém a ID e o nome do usuário
    const token = jwt.sign(
      { id: user.id, nome: user.nome }, // Dados que vão dentro do token
      JWT_SECRET, // Chave secreta
      { expiresIn: '1h' } // Tempo de expiração (1 hora)
    );

    // 5. Enviar o token e os dados do usuário para o frontend
    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// === Iniciar o Servidor ===
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});