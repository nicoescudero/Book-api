module.exports = (sequelize, type) => {
    return sequelize.define('book', {
        id: {
            primaryKey: true,
            type: type.Integer,
            autoIncrement: true
        },
        name: type.STRING,
        author: type.STRING
    })
}