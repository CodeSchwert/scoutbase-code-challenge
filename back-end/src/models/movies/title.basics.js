const Sequelize = require('sequelize');

const { ARRAY, BOOLEAN, INTEGER, STRING } = Sequelize;

module.exports = {
  tconst: { type: STRING, allowNull: false },
  titleType: { type: STRING, allowNull: false },
  primaryTitle: { type: STRING, allowNull: false },
  originalTitle: { type: STRING, allowNull: false },
  isAdult: { type: BOOLEAN, allowNull: false },
  startYear: { type: INTEGER, allowNull: false },
  endYear: { type: INTEGER, allowNull: true },
  runtimeMinutes: { type: INTEGER, allowNull: true },
  genres: { type: ARRAY(STRING), allowNull: true }
};
