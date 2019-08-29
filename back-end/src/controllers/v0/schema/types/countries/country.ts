import { 
  GraphQLObjectType, 
  GraphQLList, 
  GraphQLString, 
  GraphQLInt 
} from 'graphql';
import ContinentType from './continent';
import LanguageType from './language'

const CountryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'CountryType',
  fields: {
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    native: { type: GraphQLString },
    phone: { type: GraphQLInt },
    continent: { type: ContinentType },
    capital: { type: GraphQLString },
    currency: { type: GraphQLString },
    languages: { type: new GraphQLList(LanguageType) },
    emoji: { type: GraphQLString },
    emojiU: { type: GraphQLString }
  }
});

export default CountryType;
