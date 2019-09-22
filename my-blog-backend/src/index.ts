import express from 'express';
import bodyParser  from 'body-parser';
import path from 'path';
import cors from 'cors';
import { Response, Request } from 'express-serve-static-core';
import errorGlobalHandler from 'errorhandler';
import logger from 'morgan';
import dotenv from 'dotenv';

import { errorHandler } from './modules/errors';

import Articles from './routes/articles';

const app = express();

dotenv.config();

const port = process.env.SERVER_PORT;

// tell node server serve static file from build folder
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use(errorGlobalHandler());
}

app[Articles.insert.requestMethod](Articles.insert.routeUrl, Articles.insert.func);
app[Articles.findByName.requestMethod](Articles.findByName.routeUrl, Articles.findByName.func);
app[Articles.upvote.requestMethod](Articles.upvote.routeUrl, Articles.upvote.func);
app[Articles.comment.requestMethod](Articles.comment.routeUrl, Articles.comment.func);

// all request that ain't caught by any other api routes should be passed to our client app
app.get('*', (req: Request, res: Response): void => { res.sendFile(path.join(__dirname + '/build/index.html')) });

app.listen(port, ()=> console.log('listening'));