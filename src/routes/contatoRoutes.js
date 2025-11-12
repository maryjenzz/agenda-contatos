const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/ContatoController');

// Rota raiz da API /contatos
router.get('/', contatoController.listar);         // Listar todos
router.post('/', contatoController.criar);        // Criar novo

// Rotas para formulários
router.get('/novo', contatoController.formCriar); // Rota para a página de criação

// Rotas com parâmetro de ID (para editar/excluir)
router.get('/:id/editar', contatoController.formEditar); // Rota para a página de edição
router.put('/:id', contatoController.atualizar);     // Atualizar (PUT)
router.delete('/:id', contatoController.excluir);    // Excluir (DELETE)

module.exports = router;