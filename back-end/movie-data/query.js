const { Sequelize } = require('sequelize');
const { 
  titleBasic, 
  titlesRatings, 
  titlePrincipals, 
  nameBasic 
} = require('../src/controllers/v0/models/movies');

require('dotenv').config({ path: '../.db.env' });
const {
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT
} = process.env;

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

    const TitleBasic = await sequelize.define(
      'titleBasics', titleBasic, { tableName: 'titleBasic' }
    );
    const TitleRating = await sequelize.define(
      'titlesRatings', titlesRatings, { tableName: 'titlesRatings' }
    );
    const TitlePrincipals = await sequelize.define(
      'titlePrincipals', titlePrincipals, { tableName: 'titlePrincipals' }
    );
    const NameBasic = await sequelize.define(
      'nameBasic', nameBasic, { tableName: 'nameBasic' }
    );

    TitleBasic.hasOne(TitleRating, { foreignKey: 'tconst' });
    TitleRating.belongsTo(TitleBasic, { foreignKey: 'tconst' });

    TitlePrincipals.belongsToMany(TitleBasic, { through: 'titleBasic' });
    TitleBasic.hasMany(TitlePrincipals, { foreignKey: 'tconst' });

    TitlePrincipals.hasMany(NameBasic, { sourceKey: 'nconst', foreignKey: 'nconst' });
    NameBasic.hasMany(TitlePrincipals, { sourceKey: 'nconst', foreignKey: 'nconst' });
    
    const titlesQuery = await TitleBasic.findAll({ 
      where: { titleType: 'movie' },
      include: [
        { 
          model: TitleRating,
          attributes: ['tconst', 'averageRating', 'numVotes']
        }
      ],
      limit: 10,
      offset: 200,
      attributes: ['tconst', 'primaryTitle', 'year']
    });

    for (let tb of titlesQuery) {
      console.log(JSON.stringify(tb.dataValues, null, 2));
    }

    const movieQuery = await TitleBasic.findOne({
      where: { primaryTitle: 'Hamlet' },
      include: [
        {
          model: TitlePrincipals,
          attributes: ['tconst', 'nconst', 'category'],
          include: [
            {
              model: NameBasic,
              attributes: ['nconst', 'primaryName', 'birthday']
            }
          ]
        }
      ],
      attributes: ['tconst', 'primaryTitle', 'year']
    });
    console.log(JSON.stringify(movieQuery.dataValues, null, 2));
    
  } catch (e) {
    console.error(e);
  }
})()