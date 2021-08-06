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