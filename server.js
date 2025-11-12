const express = require('express'); // Importa o Express
const path = require('path'); // Módulo nativo do Node.js para manipulação de caminhos
const methodOverride = require('method-override'); // Importa o method-override
const session = require('express-session'); // Importa o express-session
const flash = require('connect-flash'); // Importa o connect-flash para mensagens flash
const { sequelize, Contato } = require('./src/database/db'); // Importa a instância do Sequelize e o modelo Contato
const contatoRoutes = require('./src/routes/contatoRoutes');  // Importa as rotas de contatos

// Cria a aplicação Express
const app = express();
const PORT = 3000;

// --- Configuração do View Engine (EJS) ---
app.set('views', path.join(__dirname, 'src', 'views')); // Define a pasta de views
app.set('view engine', 'ejs'); // Define o EJS como motor de templates

// --- Middlewares ---
app.use(session({
    secret: 'suaChaveSecretaMuitoSegura', // Chave usada para assinar o cookie de sessão
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // Opcional: define um tempo de vida para a sessão
}));
app.use(flash());
// Middleware para disponibilizar mensagens flash para todas as views
app.use((req, res, next) => {
    // res.locals são variáveis que servem para as views
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
// Adiciona o method-override antes das rotas
app.use(methodOverride('_method')); // Permite que a URL use `?_method=DELETE` ou `?_method=PUT`
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear o corpo das requisições
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos da pasta 'public'

// --- Configuração das Rotas ---
app.use('/contatos', contatoRoutes); 

// Rota raiz redireciona para /contatos
app.get('/', (req, res) => {
    res.redirect('/contatos');
});

// ... (Inicialização do Servidor e Banco de Dados)
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Impossível conectar ao banco de dados:', err);
    });