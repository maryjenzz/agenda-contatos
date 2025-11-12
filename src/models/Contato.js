// Exporta uma função que recebe o sequelize que é a conexão com o banco de dados e o DataTypes para definir os tipos de dados (string, número, etc)
module.exports = (sequelize, DataTypes) => {
    // Cria o modelo Contato e isso vai gerar a tabela 'Contatos' no banco de dados
    const Contato = sequelize.define('Contato', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true, 
            unique: true
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });

    return Contato;
};