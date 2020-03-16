'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    PostId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    PostTitle: DataTypes.STRING,
    PostBody: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  posts.associate = function(models) {
    posts.belongsTo(models.users, {foreignKey: "UserId"})
  };
  return posts;
};