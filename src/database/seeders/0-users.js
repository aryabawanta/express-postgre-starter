'use strict';

const { hash } = require("bcrypt")
const users = require("./data/users")
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      data.push({
        ...user,
        password: await hash(user.password, 10),
        id: uuidv4(),
      })
    }
    await queryInterface.bulkInsert('users', data, {});
  },

  async down(queryInterface, _) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
