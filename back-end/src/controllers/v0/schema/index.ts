import { GraphQLSchema } from 'graphql';

import query from './query';
import mutation from './mutation';

const schema: GraphQLSchema = new GraphQLSchema({
  query,
  mutation
});

export default schema;
