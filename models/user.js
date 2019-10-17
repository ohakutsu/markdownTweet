'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    comment: DataTypes.STRING,
    profileImage: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    user.hasMany(models.item, { foreignKey: 'userId' });
    user.hasMany(models.like, { foreignKey: 'userId' });
  };
  return user;
};