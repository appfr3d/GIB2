'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      await queryInterface.addColumn('Restaurants', 'latitude', { type: Sequelize.DOUBLE, allowNull: false }),
      await queryInterface.addColumn('Restaurants', 'longitude', { type: Sequelize.DOUBLE, allowNull: false })
    ];
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Restaurants', 'position');
  }
};
