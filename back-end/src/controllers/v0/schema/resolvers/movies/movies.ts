import { sequelize } from '../../../../../server';
import { 
  nameBasic, 
  titleBasic, 
  titlePrincipals, 
  titlesRatings
  // @ts-ignore
} from '../../../../v0/models/movies';
import { Movie } from './index.d';

function randomIntInc(low: number, high: number): number {
  return Math.floor(Math.random() * (high - low + 1) + low);
};

function scoutBaseRating(): string {
  let scoutRating: number = parseFloat(randomIntInc(5,9).toFixed(1));

  if (scoutRating < 9) {
    scoutRating = scoutRating + parseFloat(Math.random().toFixed(1));
  }

  return scoutRating.toFixed(1);
};

export default async function(context: any) {
  try {
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

    // @ts-ignore
    TitleBasic.hasOne(TitleRating, { foreignKey: 'tconst' });
    // @ts-ignore
    TitleRating.belongsTo(TitleBasic, { foreignKey: 'tconst' });
    // @ts-ignore
    TitlePrincipals.belongsToMany(TitleBasic, { through: 'titleBasic' });
    // @ts-ignore
    TitleBasic.hasMany(TitlePrincipals, { foreignKey: 'tconst' });
    // @ts-ignore
    TitlePrincipals.hasMany(NameBasic, { sourceKey: 'nconst', foreignKey: 'nconst' });
    // @ts-ignore
    NameBasic.hasMany(TitlePrincipals, { sourceKey: 'nconst', foreignKey: 'nconst' });

    const movies: Movie[] = [];

    // offset is used to return a random set of movies
    const offset = randomIntInc(0, 10000);

    console.log('scoutRating', scoutBaseRating());
    console.log('context.res.headers', context.cookies['scoutbase-code-challenge']);

    // @ts-ignore
    const titlesQuery = await TitleBasic.findAll({
      where: { titleType: 'movie' },
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
        },        
        { 
          model: TitleRating,
          attributes: ['tconst', 'averageRating', 'numVotes']
        }
      ],
      limit: 20,
      offset,
      attributes: ['tconst', 'primaryTitle', 'year']
    });

    for (let movie of titlesQuery) {
      // console.log('movie:', JSON.stringify(movie, null, 2));

      const { primaryTitle, year, titlesRating, titlePrincipals } = movie;

      const title: string = primaryTitle;
      const rating: number = titlesRating ? titlesRating.averageRating : titlesRating;

      const actors = [];
      const directors = [];

      if (titlePrincipals) {
        for (let principal of titlePrincipals) {
          if (principal.nameBasics.length > 0) {
            const { primaryName, birthday } = principal.nameBasics[0];
            const record = {
              name: primaryName,
              birthday,
              country: ''
            };

            if (principal.category == 'actor') {
              actors.push(record);
            }
            if (principal.category == 'director') {
              directors.push(record);
            }
          }
        }
      }

      const populateMovie: any = {
        title,
        year,
        rating,
        actors,
        directors
      };

      if (context.cookies['scoutbase-code-challenge']) {
        populateMovie['scoutbase_rating'] = scoutBaseRating();
      }

      movies.push(populateMovie);
    }

    return movies;

  } catch (e) {
    console.error(e);
  }
};
