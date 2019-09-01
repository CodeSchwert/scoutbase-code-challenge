const Sequelize = require('sequelize');

const { ARRAY, STRING } = Sequelize;

module.exports = {
  tconst: { type: STRING, allowNull: false },
  directors: { type: ARRAY(STRING), allowNull: true },
  writers: { type: ARRAY(STRING), allowNull: true }
};
