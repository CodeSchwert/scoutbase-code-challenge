import { GraphQLObjectType, GraphQLString } from 'graphql';

const HelloWorldType: GraphQLObjectType = new GraphQLObjectType({
  name: 'HelloWorldType',
  fields: {
    hello: { type: GraphQLString }
  }
});

export default HelloWorldType;
