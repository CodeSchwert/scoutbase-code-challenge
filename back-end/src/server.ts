import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { IndexRouter } from './controllers/v0/index.router';

import user from './controllers/v0/models/users/user';

dotenv.config({ path: '.db.env' });
const {
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT
} = process.env;

const uri = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
const sequelize = new Sequelize(uri, { 
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
    }
});

const User = sequelize.define(
  'user', user, { tableName: 'users' }
);
User.sync();

(async () => {
  try {
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
  
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

export { sequelize, User };
