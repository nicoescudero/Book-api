module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        dni: {
            primaryKey: true,
            type: type.INTEGER
        },
        nombre: type.STRING,
        apellido: type.STRING
    })
};