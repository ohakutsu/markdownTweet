'use strict';

const demoLikes = [...Array(20).keys()].map((i) => ({
  userId: (i % 10) + 1,
  itemId: i + 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes', demoLikes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
