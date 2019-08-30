import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const LanguageType: GraphQLObjectType = new GraphQLObjectType({
  name: 'LanguageType',
  fields: {
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    native: { type: GraphQLString },
    rtl: { type: GraphQLInt }
  }
});

export default LanguageType;
