const bcrypt = require("bcrypt");

const Usuario = (sequelize, Sequelize) => {
    return sequelize.define("Usuario", {
        nombre:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        id_usuario: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true, // para ver cuándo se creó y cuándo se modificó
        hooks: { // tengo un hook que dice que antes de crear algo haga tal cosa
            beforeCreate: async (Usuario) => {
                if(Usuario.password){
                    const salt = await bcrypt.genSalt(10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt);
                }
            },
        },
    })
}

module.exports = Usuario;            