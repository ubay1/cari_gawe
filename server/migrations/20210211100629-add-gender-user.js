/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const DataTypes = withDateNoTz(Sequelize);
    await queryInterface.addColumn('users','gender', { type: Sequelize.STRING(1) })
  },

  down: async (queryInterface, Sequelize) => {
    // const Sequelize = withDateNoTz(Sequelize);
    await queryInterface.removeColumn('users','gender', { type: Sequelize.STRING(1) })
  }
};
