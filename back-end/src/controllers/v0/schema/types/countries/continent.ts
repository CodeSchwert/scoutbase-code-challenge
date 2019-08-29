import { GraphQLObjectType, GraphQLString } from 'graphql';

const ContinentType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ContinentType',
  fields: {
    code: { type: GraphQLString },
    name: { type: GraphQLString},
  }
});

export default ContinentType;
