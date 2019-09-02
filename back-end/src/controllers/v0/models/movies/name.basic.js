const Sequelize = require('sequelize');

const { ARRAY, INTEGER, STRING } = Sequelize;

module.exports = {
  nconst: { type: STRING, allowNull: false },
  primaryName: { type: STRING, allowNull: false },
  birthYear: { type: INTEGER, allowNull: true },
  deathYear: { type: INTEGER, allowNull: true },
  primaryProfession: { type: ARRAY(STRING), allowNull: true },
  knownForTitles: { type: ARRAY(STRING), allowNull: true }
};
