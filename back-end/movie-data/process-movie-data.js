const fs = require('fs');
const Papa = require('papaparse');
const { Sequelize } = require('sequelize');
const imdbDataFiles = require('./imdb-data-files');
const {
  nameBasic, 
  titleBasic, 
  titlePrincipals
} = require('../src/controllers/v0/models/movies');

require('dotenv').config({ path: '../.db.env' });
const {
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB
} = process.env;

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
    const uri = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}`;
    const sequelize = new Sequelize(uri, { 
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
    
    const TitleBasic = await sequelize.define(
      'titleBasics', titleBasic, { tableName: 'titleBasic' }
    );
    await TitleBasic.sync({ force: true });

    const TitlePrincipals = await sequelize.define(
      'titlePrincipals', titlePrincipals, { tableName: 'titlePrincipals' }
    );
    await TitlePrincipals.sync({ force: true });
    
    /**
     * bulk data arrays
     */
    const names = [];
    const titles = [];
    const principals = [];
    
    /**
     * processes TSV functions
     */
    const procNameBasic = async (row) => {
      try {   
        const { 
          nconst, 
          primaryName, 
          birthYear,
          deathYear,
          primaryProfession, 
          knownForTitles
        } = row.data;
      
        const parsedBirthYear = (valueOrNull(birthYear) == null)
          ? null
          : parseInt(birthYear)

        const parsedDeathYear = (valueOrNull(deathYear) == null) 
          ? null 
          : parseInt(deathYear);

        names.push({ 
          nconst,
          primaryName,
          birthYear: parsedBirthYear,
          deathYear: parsedDeathYear,
          primaryProfession: primaryProfession ? primaryProfession.split(',') : [],
          knownForTitles: knownForTitles ? knownForTitles.split(',') : []
        })
      } catch (e) {
        console.error(e);
      }
    };
    
    const procTitleBasic = (row) => {
      console.log('procTitleBasic:', row.data);
    };
    
    const procTitlePrincipals = (row) => {
      console.log('procTitlePricipals:', row.data);
    };


    /**
     * bulk create record functions
     */
    const bulkCreateNames = async () => {
      await NameBasic.bulkCreate(names);
    };
    const bulkCreateTitles = async () => {
      await TitleBasic.bulkCreate(titles);
    };
    const bulkCreatePrincipals = async () => {
      await TitlePrincipals.bulkCreate(principals);
    };
    
    /**
     * process datasets ...
     */
    for (let dataset of imdbDataFiles) {
      const { filename } = dataset;
    
      // set process and create functions
      let procFunction;
      let bulkCreateFunction;
      switch (filename) {
        case 'name.basics.tsv':
          procFunction = procNameBasic;
          bulkCreateFunction = bulkCreateNames;
          break;
        // case 'title.basics.tsv':
        //   procFunction = procTitleBasic;
        //   break;
        // case 'title.principals.tsv':
        //   procFunction = procTitlePrincipals;
        //   break;
        default:
          procFunction = null;
          break;
      }
    
      // parse TSV rows and bulk create on complete read of TSV file
      if (procFunction != null) {
        Papa.parse(fs.createReadStream(filename), {
          delimiter: '\t',
          header: true,
          step: procFunction,
          complete: bulkCreateFunction
        });
      }
    }
    
  } catch (e) {
    console.error(e);
  }
})()
