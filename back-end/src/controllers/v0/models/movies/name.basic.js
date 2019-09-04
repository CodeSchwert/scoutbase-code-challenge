const Sequelize = require('sequelize');

const { INTEGER, STRING, TEXT } = Sequelize;

module.exports = {
  nconst: { type: STRING, allowNull: false, primaryKey: true },
  primaryName: { type: TEXT, allowNull: false },
  birthday: { type: INTEGER, allowNull: true },
  country: { type: TEXT, allowNull: true, defaultValue: null }
};
