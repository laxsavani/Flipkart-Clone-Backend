'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.hasMany(models.OrderItems, { foreignKey: 'order_id' });
      Order.belongsTo(models.Seller, { foreignKey: 'seller_id' });
    }
  }
  Order.init({
    quantity: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
    paymentMethod: 
    {
      type: DataTypes.ENUM('COD','ONLINE')
    },
    status: {
      type: DataTypes.ENUM('Placed','Shipped','Delivered','Cancelled'),
      defaultValue: 'Placed'
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Order',   
    freezeTableName: true 
  });
  return Order;
};