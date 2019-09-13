import { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLInt,
  GraphQLNullableType
} from 'graphql';

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    username: { type: GraphQLString }
  }
});

export default UserType;
