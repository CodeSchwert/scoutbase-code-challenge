import { GraphQLObjectType } from 'graphql';
import { createUser, login } from './mutations/auth';

const Mutation: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    login
  }
});

export default Mutation;
