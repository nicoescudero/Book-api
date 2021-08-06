const Sequelize = require('sequelize');
const userModel = require('../models/user');

const sequelizeConexion = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})
function init() {
    sequelizeConexion.authenticate()
        .then(() => console.log('Database Connected'))
        .catch(error => console.log(error));
}

const User = userModel(sequelizeConexion, Sequelize);

sequelizeConexion.sync({ force: true })
    .then(() => console.log('Syncronized'))

module.exports = { User };