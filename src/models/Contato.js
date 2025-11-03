module.exports = (sequelize, DataTypes) => {
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
            allowNull: true, // Email é opcional, como você sugeriu
            unique: true
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });

    return Contato;
};