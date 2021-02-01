'use strict';
module.exports = {
  //up will run during migration
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fruits', {
      id: {
        allowNull: false,//NOT NULL constraint
        autoIncrement: true, //SERIAL
        primaryKey: true, //PK
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      readyToEat: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  //down will run during undo of migration
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Fruits');
  }
};