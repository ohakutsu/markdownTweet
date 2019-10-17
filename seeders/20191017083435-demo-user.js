'use strict';

const demoUsers = [...Array(10).keys()].map((i) => ({
  name: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  password: `pass${i + 1}word`,
  comment: `I am user${i + 1}`,
  profileImage: 'https://www.pakutaso.com/shared/img/thumb/kuchikomi969_TP_V.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', demoUsers, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
