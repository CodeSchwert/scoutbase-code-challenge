const Sequelize = require('sequelize');

const { ARRAY, BOOLEAN, INTEGER, STRING } = Sequelize;

module.exports = {
  titleId: { type: STRING, allowNull: false },
  ordering: { type: INTEGER, allowNull: false },
  title: { type: STRING, allowNull: false },
  region: { type: STRING, allowNull: true },
  language: { type: STRING, allowNull: true },
  types: { type: ARRAY(STRING), allowNull: true },
  attributes: { type: ARRAY(STRING), allowNull: true },
  isOriginalTitle: { type: BOOLEAN, allowNull: false }
};
