"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsToMany(models.User, {
        as: "users",
        through: models.UserRooms,
        // foreignKey: "user_id",
      });
      // Room.hasMany(models.User_Room , {
      //   as:"Room_User",
      //   // foreignKey:{
      //   //   name:"user_id"
      //   // }
      // });
      Room.hasMany(models.Message , {
        as:"messages",
        foreignKey:"room_id"
      })
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      cover_image: DataTypes.STRING,
      background_image: DataTypes.STRING,
      // group: DataTypes.BOOLEAN,
      admin_one: DataTypes.INTEGER,
      admin_two: DataTypes.INTEGER,
      admin_three: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
