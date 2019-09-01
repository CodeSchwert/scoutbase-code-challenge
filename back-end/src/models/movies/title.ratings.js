const Sequelize = require('sequelize');

const { FLOAT, INTEGER, STRING } = Sequelize;

module.exports = {
  tconst: { type: STRING, allowNull: false },
  averageRating: { type: FLOAT, allowNull: false },
  numVotes: { type: INTEGER, allowNull: false }
};
