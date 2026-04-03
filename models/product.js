'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.SubCategory, { foreignKey: 'subcategory_id' });
      Product.belongsTo(models.Seller, { foreignKey: 'seller_id' });
      Product.hasMany(models.CartItems, { foreignKey: 'product_id' });
      Product.hasMany(models.OrderItems, { foreignKey: 'product_id' });

    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    mrp: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    images: DataTypes.TEXT,
    seller_id: DataTypes.INTEGER,
    subCategory_id: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Product',
    tableName: 'Product',   
    freezeTableName: true 
  });
  return Product;
};