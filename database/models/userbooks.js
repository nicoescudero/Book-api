'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBooks.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    BookId: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'UserBooks',
  });
  return UserBooks;
};