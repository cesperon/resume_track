'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Applications', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: {

            tableName: 'Users',
          },
          key: 'id',

        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false

      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([queryInterface.removeColumn('Applications', 'user_id')]);
  }
};
