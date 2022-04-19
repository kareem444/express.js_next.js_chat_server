'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cover_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      background_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      group: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      admin_one: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      admin_two: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      admin_three: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  }
};