module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        userName: type.STRING,
        email: type.STRING,
        password: type.STRING
    })
};