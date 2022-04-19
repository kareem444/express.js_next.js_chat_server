"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserRooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Users",
          key: "id",
        },
      },
      RoomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Rooms",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserRooms");
  },
};
