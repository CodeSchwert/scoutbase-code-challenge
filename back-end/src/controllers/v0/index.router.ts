import { Router, Request, Response } from 'express';
import expressGraphQL from 'express-graphql';

import schema from './schema';

import countriesRouter from './countries.router';

const router: Router = Router();

/* enable graphiQL interface in non-production modes */
const graphiql = process.env.NODE_ENV == 'production' ? false : true;

router.get('/', async (req: Request, res: Response) => {
  res.send({ api: true, version: 0 });
});

// inject countries REST routes into router 
countriesRouter(router);

router.use(
  '/graphql', 
  expressGraphQL({
    schema,
    graphiql
  })
);

export const IndexRouter: Router = router;
