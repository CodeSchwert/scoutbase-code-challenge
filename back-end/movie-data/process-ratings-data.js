const fs = require('fs');
const Papa = require('papaparse');
const { Sequelize } = require('sequelize');
const { titlesRatings } = require('../src/controllers/v0/models/movies');

require('dotenv').config({ path: '../.db.env' });
const {
  PG_PASSWORD,
  PG_USER,
  PG_DB,
  PG_HOST,
  PG_PORT
} = process.env;

const BULK_LOAD_COUNT = 250000;

/**
 * helper functions
 */
const valueOrNull = (value) => {
  return (value == '\\N') ? null : value;
};

/**
 * process ...
 */
(async () => {
  try {
    const uri = `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`;
    const sequelize = new Sequelize(uri, { 
      logging: false,
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
        }
    });
    
    /**
     * define movie models
     */
    const TitleRating = await sequelize.define(
      'titlesRatings', titlesRatings, { tableName: 'titlesRatings' }
    );
    await TitleRating.sync({ force: true });
    
    /**
     * bulk data arrays
     */
    let ratings = [];
    let ratingsCounter = 0;
    
    /**
     * processes TSV functions
     */
    const procTitleRatingss = async (row, parser) => {
      try {
        if (ratings.length < BULK_LOAD_COUNT) {
          const { tconst, averageRating, numVotes } = row.data;

          ratings.push({
            tconst,
            averageRating,
            numVotes
          });

          process.stdout.write(`Parsing Ratings: ${ratings.length}         \r`);
        } else {
          parser.pause();
          console.log(`\nBulk Creating ${ratings.length} Ratings records ...`);
          await TitleRating.bulkCreate(ratings);
          ratingsCounter += ratings.length;
          console.log(`Ratings records created: ${ratingsCounter}`);
          ratings = [];
          parser.resume();
        }
      } catch (e) {
        console.error(e);
      }
    };

    /**
     * bulk create record functions
     */
    const bulkCreateRatings = async () => {
      console.log(`\nBulk Creating ${ratings.length} Ratings records ...`);
      await TitleRating.bulkCreate(ratings);
      ratingsCounter += ratings.length;
      console.log(`Ratings records created: ${ratingsCounter}`);
      ratings = [];
    };
    
    /**
     * process dataset ...
     */
    Papa.parse(fs.createReadStream('title.ratings.tsv'), {
      delimiter: '\t',
      header: true,
      step: procTitleRatingss,
      complete: bulkCreateRatings
    });
    
  } catch (e) {
    console.error(e);
  }
})()
