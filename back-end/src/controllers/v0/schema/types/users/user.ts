import { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    username: { type: GraphQLString },
    error: { type: GraphQLBoolean },
    errorMsg: { type: GraphQLString }
  }
});

export default UserType;
