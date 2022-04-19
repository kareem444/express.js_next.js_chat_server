"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRooms extends Model {
    static associate(models) {
    }
  }
  UserRooms.init(
    {
      UserId: DataTypes.NUMBER,
      RoomId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "UserRooms",
    }
  );
  return UserRooms;
};
