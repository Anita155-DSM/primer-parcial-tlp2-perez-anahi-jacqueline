import { DataTypes } from "sequelize";

export const ProfileModel = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  first_name: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  last_name: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  phone: { 
    type: DataTypes.STRING(20), 
    allowNull: true 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'profiles'
});

// Relación uno a uno con User (1 User tiene 1 Profile)
// * 1:1 Profile ↔ User
// * 'profile' (User) y 'user' (Profile)
// Se establecerá la asociación en un archivo de asociaciones
