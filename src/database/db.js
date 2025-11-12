const { Sequelize, DataTypes } = require('sequelize');

// Cria a instância do Sequelize apontando para um arquivo de banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite' // O arquivo do banco de dados será criado aqui
});

// Define o Modelo (Model) Contato
const Contato = require('../models/Contato')(sequelize, DataTypes);

// Sincroniza o banco de dados (cria a tabela se ela não existir)
sequelize.sync()
    .then(() => console.log('✅ Banco de dados e tabela de contatos sincronizados com sucesso!'))
    .catch(err => console.error('❌ Erro ao sincronizar o banco de dados:', err));

// Exporta a instância do Sequelize e o modelo Contato
module.exports = {
    sequelize,
    Contato
};