'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TodoEntities', [{
      name: 'pending todo',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: null
    }, {
      name: 'finished todo',
      status: 'finished',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TodoEntities', null, {});
  }
};
