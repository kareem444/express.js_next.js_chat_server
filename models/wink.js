'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wink extends Model {
    static associate(models) {
      // define association here
    }
  };
  Wink.init({
    ToUserId: DataTypes.INTEGER,
    FromUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wink',
  });
  return Wink;
};