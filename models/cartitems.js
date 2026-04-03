'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItems.belongsTo(models.Cart, { foreignKey: 'cart_id' });
      CartItems.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  CartItems.init({
    quantity: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItems',
    tableName: 'CartItems', 
    freezeTableName: true
  });
  return CartItems;
};