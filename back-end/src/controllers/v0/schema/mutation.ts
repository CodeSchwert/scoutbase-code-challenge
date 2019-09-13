import { GraphQLObjectType } from 'graphql';
import createUser from './mutations/auth/createUser';

const Mutation: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser
  }
});

export default Mutation;
