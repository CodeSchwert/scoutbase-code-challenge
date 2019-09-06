import { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLFloat,
  GraphQLList
} from 'graphql';
import ActorType from './actor';
import DirectorType from './director';

const MovieType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MovieType',
  fields: {
    scoutbase_rating: { type: GraphQLFloat },
    title: { type: GraphQLString },
    year: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    actors: { type: new GraphQLList(ActorType) },
    directors: { type: new GraphQLList(DirectorType) }
  }
});

export default MovieType;
