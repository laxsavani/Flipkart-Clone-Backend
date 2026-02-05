'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.belongsTo(models.Category, { foreignKey: 'category_id' });
      SubCategory.hasMany(models.Product, { foreignKey: 'subcategory_id' });
    }
  }
  SubCategory.init({
    name: DataTypes.STRING,
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
    modelName: 'SubCategory',
    tableName: 'SubCategory',   
    freezeTableName: true 
  });
  return SubCategory;
};