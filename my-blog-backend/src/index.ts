import express from 'express';
import bodyParser  from 'body-parser';
import path from 'path';
import cors from 'cors';
import { Response, Request } from 'express-serve-static-core';
import errorGlobalHandler from 'errorhandler';
import logger from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './modules/db';

import { errorHandler } from './modules/errors';

import ArticleRoutes from './routes/articles';

const app = express();

dotenv.config();

const port = process.env.SERVER_PORT;

// tell node server serve static file from build folder
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);

connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use(errorGlobalHandler());
}

app.use(ArticleRoutes);

// all request that ain't caught by any other api routes should be passed to our client app
app.get('*', (req: Request, res: Response): void => { res.sendFile(path.join(__dirname + '/build/index.html')) });

app.listen(port, ()=> console.log('listening'));