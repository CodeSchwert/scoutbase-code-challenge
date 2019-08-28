import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

(async () => {
  const app = express();
  
  app.use(bodyParser.json());

  /* enable CORS across the app ... */
  app.use(cors());
  app.options('*', cors());

  app.get('/', async (req, res) => {
    res.send({ Scoutbase: 'Code Challenge' });
  });

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`\nServer listening on http://localhost:${port}`);
    console.log(`Press CTRL+C to stop server\n`);
  });
})()
