const bcrypt = require("bcrypt");

const Usuario = (sequelize, Sequelize) => {
    return sequelize.define("Usuario", {
        nombre:{
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
        avatar: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "default_avatar.jpg", // si no se especifica avatar, se asume que es default_avatar.jpg
        }
    }, {
        timestamps: true, // para ver cuándo se creó y cuándo se modificó
        hooks: { // tengo un hook que dice que antes de crear algo haga tal cosa
            beforeCreate: async (Usuario) => {
                if(Usuario.password){
                    const salt = await bcrypt.genSalt(10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt);
                }
            },
            beforeUpdate: async (Usuario) => {
                if(Usuario.changed("password")){
                    const salt = await bcrypt.genSalt(10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt);
                }
            },   
        },
    })
}

module.exports = Usuario;            