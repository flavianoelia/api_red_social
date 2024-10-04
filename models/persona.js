const bcrypt = require("bcrypt");

const Persona = (sequelize, Sequelize) => {
    return sequelize.define("Persona", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        edad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        oficinaId: {  // Agregando la clave foránea para Oficina
            type: Sequelize.INTEGER,
            references: {
                model: 'Oficinas',  // Nombre del modelo al que se hace referencia
                key: 'id',  // Clave primaria del modelo Oficina
            },
            allowNull: true,  // Puede ser null si la persona no está asignada a ninguna oficina
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        hooks: {
            beforeCreate: async (persona) => {
                if(persona.password){
                    const salt = await bcrypt.genSalt(10);
                    persona.password = await bcrypt.hash(persona.password, salt);
                }
            },
        },
    })
}

module.exports = Persona;