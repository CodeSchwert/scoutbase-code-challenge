const fs = require('fs');
const Papa = require('papaparse');
const { Sequelize } = require('sequelize');
const { nameBasic } = require('../src/controllers/v0/models/movies');

require('dotenv').config({ path: '../.db.env' });
const {
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT
} = process.env;

const BULK_LOAD_COUNT = 100000;

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
    const uri = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
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
    const NameBasic = await sequelize.define(
      'nameBasic', nameBasic, { tableName: 'nameBasic' }
    );
    await NameBasic.sync({ force: true });
    
    /**
     * bulk data arrays
     */
    let names = [];
    let namesCounter = 0;
    
    /**
     * processes TSV functions
     */
    const procNameBasic = async (row, parser) => {
      try {
        if (names.length < BULK_LOAD_COUNT) {
          const { nconst, primaryName, birthYear } = row.data;
        
          const parsedBirthYear = (valueOrNull(birthYear) == null)
            ? null
            : parseInt(birthYear)
  
          names.push({ 
            nconst,
            primaryName,
            birthday: parsedBirthYear
          });
  
          process.stdout.write(`Parsing Names: ${names.length}        \r`);
        } else {
          parser.pause();
          console.log(`\nBulk Creating ${names.length} Name records ...`);
          await NameBasic.bulkCreate(names);
          namesCounter += names.length;
          console.log(`Created ${namesCounter} Name records.`);
          names = [];
          parser.resume();
        }
      } catch (e) {
        console.error(e);
      }
    };

    /**
     * bulk create record functions
     */
    const bulkCreateNames = async (results) => {
      console.log(`\nBulk Creating ${names.length} Name records ...`);
      await NameBasic.bulkCreate(names);
      namesCounter += names.length;
      console.log(`Created ${namesCounter} Name records.`);
      names = [];
    };
    
    /**
     * process datasets ...
     */
    Papa.parse(fs.createReadStream('name.basics.tsv'), {
      delimiter: '\t',
      header: true,
      step: procNameBasic,
      complete: bulkCreateNames
    });
    
  } catch (e) {
    console.error(e);
  }
})()
