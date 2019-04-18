'use strict'
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      topic: DataTypes.STRING,
      application: DataTypes.STRING,
      description: DataTypes.TEXT,
      link1: DataTypes.STRING,
      link2: DataTypes.STRING,
      activeDate: DataTypes.DATE,
      expirationDate: DataTypes.DATE
    },
    {}
  )
  Article.associate = function(models) {
    // associations can be defined here
  }
  return Article
}
