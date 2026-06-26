'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const admin = [{nama : 'admin', password: 'admin123', email: 'admin@admin.com'}]
    const hashRound = bcrypt.genSaltSync(10)

    const hashAdmin = (admin.map((user) => {
      const hashPassword = bcrypt.hashSync(user.password, hashRound)
      
      user.password = hashPassword

      return user
    })
  )

  return queryInterface.bulkInsert('Users', hashAdmin)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
