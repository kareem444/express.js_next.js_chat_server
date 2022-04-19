"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Room, {
        as: "rooms",
        through: {
          model: models.UserRooms,
        },
        foreignKey: {
          name: "UserId",
        },
      });
      User.belongsToMany(User, {
        as: "friends",
        through: models.Frinds,
        foreignKey: "UserOneId",
        otherKey: "UserTwoId",
      });
      User.belongsToMany(User, {
        as: "friendsTWo",
        through: models.Frinds,
        foreignKey: "UserTwoId",
        otherKey: "UserOneId",
      });
      User.belongsToMany(User, {
        as: "friendRequests",
        through: models.FriendRequests,
        foreignKey: "ToUserId",
        otherKey: "FromUserId",
      });
      User.belongsToMany(User, {
        as: "mySentFriendRequests",
        through: models.FriendRequests,
        foreignKey: "FromUserId",
        otherKey: "ToUserId",
      });
      User.hasMany(models.Message, {
        onDelete: "cascade",
        as: "messages",
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
      });
      User.hasMany(models.Wink, {
        as: "hasWinks",
        foreignKey: "ToUserId",
        allowNull: true
      });
      User.hasMany(models.Wink, {
        as: "TodayWinks",
        foreignKey: {name:"ToUserId",allowNull: true},
        
      });
      User.hasMany(models.Wink, {
        as: "sentWinks",
        foreignKey: "FromUserId",
        allowNull: true
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.NUMBER,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
