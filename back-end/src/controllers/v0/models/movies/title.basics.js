const Sequelize = require('sequelize');

const { INTEGER, STRING, TEXT } = Sequelize;

module.exports = {
  tconst: { type: STRING, allowNull: false, primaryKey: true },
  titleType: { type: STRING, allowNull: false },
  primaryTitle: { type: TEXT, allowNull: false },
  year: { type: INTEGER, allowNull: true }
};
