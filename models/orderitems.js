'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItems.belongsTo(models.Order, { foreignKey: 'order_id' });
      OrderItems.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  OrderItems.init({
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderItems',
    tableName: 'OrderItems', 
    freezeTableName: true,
  });
  return OrderItems;
};