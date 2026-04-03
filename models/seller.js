'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seller.hasMany(models.Product, { foreignKey: 'seller_id' });
      Seller.hasMany(models.Order, { foreignKey: 'seller_id' });
    }
  }
  Seller.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seller',
    tableName: 'Seller',      
    freezeTableName: true 
  });
  return Seller;
};