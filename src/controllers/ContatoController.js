
// É responsável por controlar o que acontece quando alguém acessa certas páginas ou envia formulários no site (como criar, listar, editar ou excluir contatos).
 
const { Contato } = require('../database/db'); // Importa o modelo Contato do banco de dados


// 1. Listar todos os contatos (GET /contatos)
const listar = async (req, res) => {
    // Buscar todos os contatos no banco de dados e ordena por nome
    try {
        const contatos = await Contato.findAll({
            order: [['nome', 'ASC']]
        });
        
        // Mostra a página principal (lista.ejs) e envia os dados dos contatos pra lá
        res.render('lista', { contatos: contatos }); 

    } catch (error) {
        console.error("Erro ao listar contatos:", error);
        // Se der erro, mostra uma página de erro 
        res.status(500).send("Erro interno do servidor ao buscar contatos."); 
    }
};

// 2. Mostrar formulário de criação (GET /contatos/novo)
const formCriar = (req, res) => {
    // Mostra a página 'criar.ejs'
    res.render('criar'); 
};

// 3. Criar um novo contato (POST /contatos)
const criar = async (req, res) => {
    // Pega os dados enviados (req.body)
    try {
        const { nome, telefone, email, observacao } = req.body;
        
        // Verifica se o nome e telefone foram preenchidos 
        if (!nome || !telefone) {
             req.flash('error_msg', 'Nome e Telefone são campos obrigatórios.');
             return res.redirect('/contatos/novo'); 
        }

        // Se estiver tudo certo, cria o contato no banco de dados
        await Contato.create({ 
            nome, 
            telefone, 
            email, 
            observacao 
        });
        
        // Mostra uma mensagem de sucesso e redireciona para a lista de contatos
        req.flash('success_msg', '✅ Contato criado com sucesso!'); // req.flash é usado para mensagens temporárias
        res.redirect('/contatos'); 

    } catch (error) {
        console.error("Erro ao criar contato:", error);
        // Se der erro, mostra uma mensagem de erro 
        req.flash('error_msg', '❌ Erro ao cadastrar contato. Verifique os dados (Ex: Email duplicado).');
        res.redirect('/contatos/novo'); // e redireciona de volta para o formulário
    }
};

// 4. Mostrar formulário de edição (GET /contatos/:id/editar)
const formEditar = async (req, res) => {
    // Pega o ID da URL (req.params.id)
    const { id } = req.params;

    try {
        // Busca esse contao no banco de dados (findByPk = ID) 
        const contato = await Contato.findByPk(id);
        
        // Verifica se o contato existe
        if (!contato) {
            return res.status(404).send("Contato não encontrado para edição.");
        }
        
        // Se existir, mostra a página de edição com os dados do contato
        res.render('editar', { contato: contato });

    // Em caso de erro, mostra uma mensagem de erro
    } catch (error) {
        console.error("Erro ao buscar contato para edição:", error);
        res.status(500).send("Erro interno ao buscar dados para edição.");
    }
};

// 5. Atualizar um contato (PUT /contatos/:id)
const atualizar = async (req, res) => {
    // Pega o ID da URL 
    const { id } = req.params;
    try {
        // Atualiza o contato no banco (Contato.update())
        const [numeroDeLinhasAfetadas] = await Contato.update(req.body, {
            where: { id: id }
        });

        // Verifica se algum registro foi atualizado
        if (numeroDeLinhasAfetadas === 0) {
            req.flash('error_msg', '❌ Contato não encontrado para atualização.');
            return res.redirect('/contatos');
        }

        // Mostra mensagem de sucesso se tudo der certo
        req.flash('success_msg', '✏️ Contato atualizado com sucesso!');
        res.redirect('/contatos');

        // Caso dê erro, mostra mensagem de erro
    } catch (error) {
        console.error("Erro ao atualizar contato:", error);
        req.flash('error_msg', '❌ Erro ao atualizar o contato. Verifique os dados.');
        res.redirect(`/contatos/${id}/editar`);
    }
};

// 6. Excluir um contato (DELETE /contatos/:id)
const excluir = async (req, res) => {
    // Pega o ID da URL
    const { id } = req.params;
    // Tenta excluir o contato do banco de dados (Contato.destroy())
    try {
        const numeroDeLinhasExcluidas = await Contato.destroy({
            where: { id: id }
        });

        // Verifica se algum registro foi excluído
        if (numeroDeLinhasExcluidas === 0) {
            req.flash('error_msg', '❌ Contato não encontrado para exclusão.');
            return res.redirect('/contatos');
        }

        // Mostra mensagem de sucesso
        req.flash('success_msg', '🗑️ Contato excluído com sucesso!');
        res.redirect('/contatos');

        // ou de Erro
    } catch (error) {
        console.error("Erro ao excluir o contato:", error);
        req.flash('error_msg', '❌ Erro interno ao excluir o contato.');
        res.redirect('/contatos');
    }
};

// Exporta as funções para que outras partes do sistema possam usá-las
module.exports = {
    listar,
    formCriar,
    criar,
    formEditar,
    atualizar, // <-- Esta função usa o método PUT
    excluir    // <-- Esta função usa o método DELETE
};