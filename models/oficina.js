const Oficina = (sequelize, Sequelize) => {
    return sequelize.define("Oficina", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },        
    }, {
        timestamps: false,
    });
};

module.exports = Oficina;