"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Room, {
        as: "room",
        foreignKey: {
          name: "room_id",
          allowNull: "false"
        },
      });
      Message.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "user_id",
          allowNull: "false"
        },
      });
    }
  }
  Message.init(
    {
      content: DataTypes.STRING,
      user_id: DataTypes.NUMBER,
      room_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
