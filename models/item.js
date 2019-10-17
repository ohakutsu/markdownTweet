'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    userId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.User);
    Item.hasMany(models.Like, { foreignKey: 'itemId' });
  };
  return Item;
};