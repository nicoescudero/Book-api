module.exports = (sequelize, type) => {
    return sequelize.define('book', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        name: type.STRING,
        author: type.STRING
    })
}