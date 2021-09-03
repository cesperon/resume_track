'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applications.belongsTo(models.Users,{targetKey: 'id', foreignKey: 'user_id'});
    }
  };
  Applications.init({
    company_name: DataTypes.STRING,
    position: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    hiring_manager: DataTypes.STRING,
    date_applied: DataTypes.DATE,
    platform: DataTypes.STRING,
    tech_stack: DataTypes.ARRAY(DataTypes.STRING),
    status: DataTypes.STRING,
    compensation: DataTypes.INTEGER,
    experience: DataTypes.STRING,
    location: DataTypes.STRING,
    state: DataTypes.STRING,
    position_type: DataTypes.STRING,
    equity: DataTypes.BOOLEAN,
    salary: DataTypes.BOOLEAN,
    four_O_one: DataTypes.BOOLEAN,
    remote: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    links: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Applications',
  });
  return Applications;
};