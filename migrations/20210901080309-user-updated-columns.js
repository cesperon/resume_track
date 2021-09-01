'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'first_name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
    ],
    [
      queryInterface.addColumn('Users', 'last_name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
    ],
    [
      queryInterface.addColumn('Users', 'role', {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false
      }),
    ],
    [
      queryInterface.addColumn('Users', 'salt', {
        type: Sequelize.STRING,
        allowNull: false
      }),
    ],
    [
      queryInterface.addColumn('Users', 'last_login', {
        type: Sequelize.DATE,
        allowNull: false
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.removeColumn('Users', 'first_name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
    ],
    [
      queryInterface.removeColumn('Users', 'last_name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
    ],
    [
      queryInterface.removeColumn('Users', 'role', {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false
      }),
    ],
    [
      queryInterface.removeColumn('Users', 'salt', {
        type: Sequelize.STRING,
        allowNull: false
      }),
    ],
    [
      queryInterface.removeColumn('Users', 'last_login', {
        type: Sequelize.DATE,
        allowNull: false
      })
    ]);
  }
};
