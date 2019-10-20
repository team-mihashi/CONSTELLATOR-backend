// Import util libraries
import Express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

// Import DB libraries
import 'reflect-metadata';
import { createConnection } from 'typeorm';

// Import routes and middlewares
import errorMiddleware from './src/middlewares/errorMiddleware';
import routes from './src/routes';

const app = Express();
createConnection().then(async connection => {
  // Set settings
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());
  app.use(Express.static(path.join(__dirname, 'public')));
  app.use(errorMiddleware());

  app.use('/', routes);
});

export default app;
