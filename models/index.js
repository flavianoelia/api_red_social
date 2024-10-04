const { Sequelize } = require("sequelize");
const parameters = require("../config/config");

const sequelize = new Sequelize(
    parameters.database,
    parameters.username,
    parameters.password, {
        host: parameters.host,
        dialect: parameters.dialect,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require("./persona")(sequelize, Sequelize);
db.oficina = require("./oficina")(sequelize, Sequelize);

// Establecer relaciones
db.oficina.hasMany(db.usuario, { foreignKey: 'oficinaId' });
db.usuario.belongsTo(db.oficina, { foreignKey: 'oficinaId' });

module.exports = db;