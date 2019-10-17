'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    comment: DataTypes.STRING,
    profileImage: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Item, { foreignKey: 'userId' });
    User.hasMany(models.Like, { foreignKey: 'userId' });
  };
  return User;
};