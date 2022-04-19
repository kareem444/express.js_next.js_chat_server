'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Frinds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Frinds.init({
    UserOneId: DataTypes.INTEGER,
    UserTwoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Frinds',
  });
  return Frinds;
};