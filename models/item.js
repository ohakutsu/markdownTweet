'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    userId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  item.associate = function(models) {
    item.belongsTo(models.user);
    item.hasMany(models.like, { foreignKey: 'itemId' });
  };
  return item;
};