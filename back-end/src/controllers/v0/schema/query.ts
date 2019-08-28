import { GraphQLObjectType } from 'graphql';

import HelloWorldType from './types/hello_world';

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    helloWorld: {
      type: HelloWorldType,
      resolve() {
        return {
          hello: 'World!'
        };
      }
    }
  }
});

export default RootQueryType;
