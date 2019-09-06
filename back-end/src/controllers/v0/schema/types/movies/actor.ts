import { GraphQLObjectType, GraphQLString } from 'graphql';

const ActorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ActorType',
  fields: {
    name: { type: GraphQLString },
    birthday: { type: GraphQLString },
    country: { type: GraphQLString }
  }
});

export default ActorType;
