import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';

import HelloWorldType from './types/hello_world';

import ContinentType from './types/countries/continent';
import CountryType from './types/countries/country';
import LanguageType from './types/countries/language';
import { 
  continentList, 
  countryList,
  languageList,
  getContinent,
  getLanguage
} from './resolvers/countries';

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    helloWorld: {
      type: HelloWorldType,
      resolve() {
        return {
          hello: 'World!'
        };
      }
    },

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
    // country: {},
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
    }

    /* movies */
  }
});

export default RootQueryType;
