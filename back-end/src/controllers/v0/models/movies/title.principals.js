const Sequelize = require('sequelize');

const { INTEGER, STRING } = Sequelize;

module.exports = {
  tconst: { type: STRING, allowNull: false },
  ordering: { type: INTEGER, allowNull: false },
  nconst: { type: STRING, allowNull: false },
  category: { type: STRING, allowNull: false },
  job: { type: STRING, allowNull: true },
  characters: { type: STRING, allowNull: true }
};
