import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import ContinentType from './types/countries/continent';
import CountryType from './types/countries/country';
import LanguageType from './types/countries/language';
import { 
  continentList, 
  countryList,
  languageList,
  getContinent,
  getCountry,
  getLanguage
} from './resolvers/countries';

import MovieType from './types/movies/movie';
import { 
  getMovies
} from './resolvers/movies';

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    /* countries-list */
    continents: {
      type: new GraphQLList(ContinentType),
      resolve() {
        return continentList;
      }
    },
    continent: {
      type: ContinentType,
      args: { 
        continentCode: { type: GraphQLString } 
      },
      resolve(parentValue, args) {
        return getContinent(args.continentCode);
      }
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve() {
        return countryList;
      }
    },
    country: {
      type: CountryType,
      args: {
        countryCode: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return getCountry(args.countryCode);
      }
    },
    languages: {
      type: new GraphQLList(LanguageType),
      resolve() {
        return languageList;
      }
    },
    language: {
      type: LanguageType,
      args: {
        languageCode: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return getLanguage(args.languageCode);
      }
    },
    /* movies */
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parentValue, args, context) {
        console.log('movies.context', context);
        return getMovies(context);
      }
    }
  }
});

export default RootQueryType;
