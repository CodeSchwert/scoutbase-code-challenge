const fs = require('fs');
const Papa = require('papaparse');
const { Sequelize } = require('sequelize');
const { titleBasic, titlesRatings } = require('../src/controllers/v0/models/movies');

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
    const TitleBasic = await sequelize.define(
      'titleBasics', titleBasic, { tableName: 'titleBasic' }
    );
    const TitleRating = await sequelize.define(
      'titlesRatings', titlesRatings, { tableName: 'titlesRatings' }
    );

    TitleBasic.hasOne(TitleRating, { foreignKey: 'tconst' });
    TitleRating.belongsTo(TitleBasic, { foreignKey: 'tconst' });

    await TitleRating.sync();
    await TitleBasic.sync({ force: true });

    /**
     * bulk data arrays
     */
    let titles = [];
    let titlesCounter = 0;
    
    /**
     * processes TSV functions
     */
    const procTitleBasic = async (row, parser) => {
      try {
        if (titles.length < BULK_LOAD_COUNT) {
          const { tconst, titleType, primaryTitle, startYear } = row.data;
  
          if (titleType == 'movie') {
            const parsedStartYear = (valueOrNull(startYear) == null) 
            ? null 
            : parseInt(startYear);

            titles.push({
              tconst,
              titleType,
              primaryTitle,
              year: parsedStartYear
            });
  
            process.stdout.write(`Parsing Titles: ${titles.length}         \r`);
          }
        } else {
          parser.pause();
          console.log(`\nBulk Creating ${titles.length} Titles records ...`);
          await TitleBasic.bulkCreate(titles);
          titlesCounter += titles.length;
          console.log(`Created ${titlesCounter} Titles records.`);
          titles = [];
          parser.resume();
        }
      } catch (e) {
        console.error(e);
      }
    };

    /**
     * bulk create record functions
     */
    const bulkCreateTitles = async () => {
      console.log(`\nBulk Creating ${titles.length} Titles records ...`);
      await TitleBasic.bulkCreate(titles);
      titlesCounter += titles.length;
      console.log(`Created ${titlesCounter} Titles records.`);
      titles = [];
    };
    
    /**
     * process dataset ...
     */
    Papa.parse(fs.createReadStream('title.basics.tsv'), {
      delimiter: '\t',
      header: true,
      step: procTitleBasic,
      complete: bulkCreateTitles
    });
    
  } catch (e) {
    console.error(e);
  }
})()
