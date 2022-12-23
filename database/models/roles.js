'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(models.User, { foreignKey: 'roleId' });
    }
  }
  Roles.init({
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};