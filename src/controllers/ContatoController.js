const { Contato } = require('../database/db');

// 1. Listar todos os contatos (GET /contatos)
const listar = async (req, res) => {
    try {
        const contatos = await Contato.findAll({
            order: [['nome', 'ASC']]
        });
        
        // --- MUDANÇA AQUI ---
        // Renderiza a view 'lista.ejs' e passa o array 'contatos'
        res.render('lista', { contatos: contatos }); 
        // --------------------

    } catch (error) {
        console.error("Erro ao listar contatos:", error);
        // Em caso de erro, renderize uma página de erro ou envie a mensagem
        res.status(500).send("Erro interno do servidor ao buscar contatos."); 
    }
};

// 2. Mostrar formulário de criação (GET /contatos/novo)
const formCriar = (req, res) => {
    // --- MUDANÇA AQUI ---
    // Renderiza a view 'criar.ejs' (que criaremos a seguir)
    res.render('criar'); 
    // --------------------
};

// --- Funções de Manipulação de Dados (CRUD) ---

// 3. Criar um novo contato (POST /contatos)
const criar = async (req, res) => {
    try {
        const { nome, telefone, email, observacao } = req.body;
        
        if (!nome || !telefone) {
             req.flash('error_msg', 'Nome e Telefone são campos obrigatórios.');
             return res.redirect('/contatos/novo'); // Redireciona de volta ao formulário
        }

        await Contato.create({ 
            nome, 
            telefone, 
            email, 
            observacao 
        });
        
        // --- ADICIONANDO MENSAGEM DE SUCESSO ---
        req.flash('success_msg', '✅ Contato criado com sucesso!');
        // --------------------------------------
        res.redirect('/contatos'); 

    } catch (error) {
        console.error("Erro ao criar contato:", error);
        // --- ADICIONANDO MENSAGEM DE ERRO ---
        req.flash('error_msg', '❌ Erro ao cadastrar contato. Verifique os dados (Ex: Email duplicado).');
        // --------------------------------------
        res.redirect('/contatos/novo'); // Redireciona de volta para tentar de novo
    }
};

// 4. Mostrar formulário de edição (GET /contatos/:id/editar)
const formEditar = async (req, res) => {
    const { id } = req.params;
    try {
        const contato = await Contato.findByPk(id);
        
        if (!contato) {
            return res.status(404).send("Contato não encontrado para edição.");
        }
        
        // --- MUDANÇA AQUI ---
        // Renderiza a view 'editar.ejs' passando o objeto 'contato'
        res.render('editar', { contato: contato });
        // --------------------

    } catch (error) {
        console.error("Erro ao buscar contato para edição:", error);
        res.status(500).send("Erro interno ao buscar dados para edição.");
    }
};

// 5. Atualizar um contato (PUT /contatos/:id)
const atualizar = async (req, res) => {
    const { id } = req.params;
    try {
        const [numeroDeLinhasAfetadas] = await Contato.update(req.body, {
            where: { id: id }
        });

        if (numeroDeLinhasAfetadas === 0) {
            req.flash('error_msg', '❌ Contato não encontrado para atualização.');
            return res.redirect('/contatos');
        }

        // --- ADICIONANDO MENSAGEM DE SUCESSO ---
        req.flash('success_msg', '✏️ Contato atualizado com sucesso!');
        // --------------------------------------
        res.redirect('/contatos');

    } catch (error) {
        console.error("Erro ao atualizar contato:", error);
        req.flash('error_msg', '❌ Erro ao atualizar o contato. Verifique os dados.');
        res.redirect(`/contatos/${id}/editar`);
    }
};

// 6. Excluir um contato (DELETE /contatos/:id)
const excluir = async (req, res) => {
    const { id } = req.params;
    try {
        const numeroDeLinhasExcluidas = await Contato.destroy({
            where: { id: id }
        });

        if (numeroDeLinhasExcluidas === 0) {
            req.flash('error_msg', '❌ Contato não encontrado para exclusão.');
            return res.redirect('/contatos');
        }

        // --- ADICIONANDO MENSAGEM DE SUCESSO ---
        req.flash('success_msg', '🗑️ Contato excluído com sucesso!');
        // --------------------------------------
        res.redirect('/contatos');

    } catch (error) {
        console.error("Erro ao excluir o contato:", error);
        req.flash('error_msg', '❌ Erro interno ao excluir o contato.');
        res.redirect('/contatos');
    }
};


module.exports = {
    listar,
    formCriar,
    criar,
    formEditar,
    atualizar, // <-- Esta função usa o método PUT
    excluir    // <-- Esta função usa o método DELETE
};