import { continents, countries, languages } from 'countries-list';
import { Router, Request, Response } from 'express';

const countriesRouter = (router: Router) => {
  router.get('/continents', (req: Request, res: Response) => {
    res.send({ continents });
  });

  router.get('/countries', (req: Request, res: Response) => {
    res.send({ countries });
  });

  router.get('/languages', (req: Request, res: Response) => {
    res.send({ languages });
  });
};

export default countriesRouter;
