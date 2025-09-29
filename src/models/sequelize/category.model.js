import { DataTypes } from "sequelize";

export const CategoryModel = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true,
    validate: {
      len: [3, 100]
    }
  },
  description: { 
    type: DataTypes.STRING}, 
    allowNull: true,
    validate: {
      len: [0, 500]
    }
  }, {
  timestamps: true,
  tableName: 'categories'
});
