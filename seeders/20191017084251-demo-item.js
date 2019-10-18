'use strict';

const demoItems = [...Array(10).keys()].map((i) => [{
  userId: i + 1,
  body: `# Hello! user${i + 1}'s first tweet!`,
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  userId: i + 1,
  body: `## Good Morning! by user${i + 1}`,
  createdAt: new Date(),
  updatedAt: new Date(),
}]).flat();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', demoItems, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  }
};
