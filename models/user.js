'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      User.hasOne(models.Cart, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User', 
    freezeTableName: true 
  });
  return User;
};