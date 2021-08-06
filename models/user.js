/*const Sequelize = require('sequelize');
const { sequelizeConexion } = require('../configuration/database');

const userModel = sequelizeConexion.define('user', {
    dni: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nombre: { type: Sequelize.STRING },
    apellido: { type: Sequelize.STRING }
})
*/

module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        dni: {
            primaryKey: true,
            type: type.INTEGER
        },
        nombre: type.STRING,
        apellido: type.STRING
    })
};