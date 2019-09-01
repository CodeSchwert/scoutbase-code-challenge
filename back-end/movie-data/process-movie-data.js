const fs = require('fs');
const readline = require('readline');
const Sequelize = require('sequelize');
const imdbDataFiles = require('./imdb-data-files');

require('dotenv').config({ path: '../.db.env' });

const {
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB
} = process.env;

const uri = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}`;
const sequelize = new Sequelize(uri);

for (let dataset of imdbDataFiles) {
  const { filename } = dataset;

  const rl = readline.createInterface({
    input: fs.createReadStream(filename)
  });
  
  rl.on('line', (line) => {
    // console.log(`filename readline: ${line}`);
  });
}
