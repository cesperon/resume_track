'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Applications, {foreignKey: 'user_id'});
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    salt: DataTypes.STRING,
    last_login: DataTypes.DATE,
    role: DataTypes.ENUM('admin', 'user')

  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};