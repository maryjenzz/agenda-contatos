
// Importa o Sequelize que é uma biblioteca que ajuda a se comunicar com o banco de dados
// o DataTypes serve para definir os tipos das colunas (texto, número, data, etc)
const { Sequelize, DataTypes } = require('sequelize');

// Inicia a conexão com o banco de dados 
const sequelize = new Sequelize({
  dialect: 'sqlite', // Usando SQLite como banco de dados
  storage: 'database.sqlite' // Nome do arquivo onde os dados vao ficar salvos
});

// Importa o modelo Contato, que diz a descrição da tabela
// O (sequelize, DataTypes) é passado como parâmetro pra que o modelo saiba em qual banco ele vai ser criado e quais tipos de dados usar.
const Contato = require('../models/Contato')(sequelize, DataTypes);

// Cria a tabela no banco de dados se ela não existir
sequelize.sync()
    .then(() => console.log('✅ Banco de dados e tabela de contatos sincronizados com sucesso!'))
    .catch(err => console.error('❌ Erro ao sincronizar o banco de dados:', err));

// Exporta para outros arquivos usarem tanto a conexão (sequelize) quanto o modelo (Contato)
module.exports = {
    sequelize,
    Contato
};