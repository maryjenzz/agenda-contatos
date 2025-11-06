module.exports = (sequelize, DataTypes) => {
    // Define o modelo 'Contato' com seus campos
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