import { GraphQLObjectType, GraphQLString } from 'graphql';

const DirectorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'DirectorType',
  fields: {
    name: { type: GraphQLString },
    birthday: { type: GraphQLString },
    country: { type: GraphQLString }
  }
});

export default DirectorType;
