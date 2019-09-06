const fs = require('fs');
const Papa = require('papaparse');
const { Sequelize } = require('sequelize');
const { titlePrincipals } = require('../src/controllers/v0/models/movies');

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
    const TitlePrincipals = await sequelize.define(
      'titlePrincipals', titlePrincipals, { tableName: 'titlePrincipals' }
    );
    await TitlePrincipals.sync({ force: true });
    
    /**
     * bulk data arrays
     */
    let principals = [];
    let principalsCounter = 0;
    
    /**
     * processes TSV functions
     */
    const procTitlePrincipals = async (row, parser) => {
      try {
        if (principals.length < BULK_LOAD_COUNT) {
          const {
            tconst,
            ordering,
            nconst,
            category
          } = row.data;
  
          if (category == 'actor' || category == 'director') {
            principals.push({
              tconst,
              ordering: parseInt(ordering),
              nconst,
              category
            });
          }

          process.stdout.write(`Parsing Principals: ${principals.length} \r`);
        } else {
          parser.pause();
          console.log(`\nBulk Creating ${principals.length} principals records ...`);
          await TitlePrincipals.bulkCreate(principals);
          principalsCounter += principals.length;
          console.log(`Created ${principalsCounter} Principals records.`);
          principals = [];
          parser.resume();
        }
      } catch (e) {
        console.error(e);
      }
    };

    /**
     * bulk create record functions
     */
    const bulkCreatePrincipals = async () => {
      console.log(`Bulk Creating ${principals.length} principals records ...`);
      await TitlePrincipals.bulkCreate(principals);
      principalsCounter += principals.length;
      console.log(`Created ${principalsCounter} Principals records.`);
      principals = [];
    };
    
    /**
     * process dataset ...
     */
    Papa.parse(fs.createReadStream('title.principals.tsv'), {
      delimiter: '\t',
      header: true,
      step: procTitlePrincipals,
      complete: bulkCreatePrincipals
    });
    
  } catch (e) {
    console.error(e);
  }
})()
