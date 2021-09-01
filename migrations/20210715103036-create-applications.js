'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      hiring_manager: {
        type: Sequelize.STRING
      },
      date_applied: {
        type: Sequelize.DATE
      },
      platform: {
        type: Sequelize.STRING
      },
      tech_stack: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      status: {
        type: Sequelize.STRING
      },
      compensation: {
        type: Sequelize.INTEGER
      },
      experience: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      position_type: {
        type: Sequelize.STRING
      },
      equity: {
        type: Sequelize.BOOLEAN
      },
      salary: {
        type: Sequelize.BOOLEAN
      },
      four_O_one: {
        type: Sequelize.BOOLEAN
      },
      remote: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING
      },
      links: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applications');
  }
};