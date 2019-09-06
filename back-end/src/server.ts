import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { IndexRouter } from './controllers/v0/index.router';

dotenv.config({ path: '.db.env' });
const {
  PG_PASSWORD,
  PG_USER,
  PG_DB,
  PG_HOST,
  PG_PORT
} = process.env;

const uri = `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`;
const sequelize = new Sequelize(uri, { 
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
    }
});

(async () => {
  try {
    const app = express();
    app.use(bodyParser.json());
  
    /* enable CORS across the app ... */
    app.use(cors());
    app.options('*', cors());
  
    app.get('/', async (req, res) => {
      res.send({ Scoutbase: 'Code Challenge' });
    });
  
    app.use('/api/v0/', IndexRouter);
  
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`\nServer listening on http://localhost:${port}`);
      console.log(`Press CTRL+C to stop server\n`);
    });
  } catch (e) {
    console.error(e);
  }
})();

export { sequelize };
