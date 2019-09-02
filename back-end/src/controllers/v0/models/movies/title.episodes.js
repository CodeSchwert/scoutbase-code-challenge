const Sequelize = require('sequelize');

const { INTEGER, STRING } = Sequelize;

module.exports = {
  tconst: { type: STRING, allowNull: false },
  parentTconst: { type: STRING, allowNull: false },
  seasonNumber: { type: INTEGER, allowNull: true },
  episodeNumber: { type: INTEGER, allowNull: true }
};
