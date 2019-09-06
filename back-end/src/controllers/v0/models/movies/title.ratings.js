const Sequelize = require('sequelize');

const { FLOAT, INTEGER, STRING } = Sequelize;

module.exports = {
  tconst: { type: STRING, allowNull: false, primaryKey: true },
  averageRating: { type: FLOAT, allowNull: false },
  numVotes: { type: INTEGER, allowNull: false }
};
