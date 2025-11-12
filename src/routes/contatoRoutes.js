const express = require('express'); // Importa o Express
const router = express.Router(); // Cria um roteador do Express
const contatoController = require('../controllers/ContatoController'); // Importa o controller de contatos

// Rota raiz da API /contatos
router.get('/', contatoController.listar);         // Listar todos os contatos com GET 
router.post('/', contatoController.criar);        // Criar novo contato com POST

// Rotas para formulários
router.get('/novo', contatoController.formCriar); // Rota para a página de criação de novo contato

// Rotas com parâmetro de ID (para editar/excluir)
router.get('/:id/editar', contatoController.formEditar); // Rota para a página de edição
router.put('/:id', contatoController.atualizar);     // Atualizar (PUT) um contato existente
router.delete('/:id', contatoController.excluir);    // Excluir (DELETE)

module.exports = router;