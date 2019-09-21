import * as express from 'express';
import * as bodyParser  from 'body-parser';
import { operationWithDB } from './modules/db';
import { ARTICLES } from './constant';
import * as path from 'path';
import { Response, Request } from 'express-serve-static-core';
import * as cors from 'cors';
import { errorHandler } from './modules/errors';
import * as errorGlobalHandler from 'errorhandler';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';

/**
 * Path is standard from node, no need to install 
 * 
 */

const app = express();

dotenv.load();

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

app.get('/api/articles/:name', async (req: Request, res: Response): Promise<void> => {
    operationWithDB(async (db) => {
        const { name } = req.params;    
        const article = await db.collection(ARTICLES).findOne({ name });
        res.status(200).json(article);
    }, req, res);
});

app.post('/api/articles/:name/upvote', async (req: Request, res: Response): Promise<void> => {
    operationWithDB(async (db) => {
        const { name } = req.params;
        const article = await db.collection(ARTICLES).findOne({ name });
        await db.collection(ARTICLES).updateOne({ name }, {
            '$set': {
                upvotes: article.upvotes + 1
            }
        });
        const updatedArticle = await db.collection(ARTICLES).findOne({name});
        res.status(200).json(updatedArticle);
    }, req, res);
});

app.post('/api/articles/:name/comments', async (req: Request, res: Response): Promise<void> => {
    const { username, content } = req.body;
    const { name } = req.params;
    
    operationWithDB( async (db) => {
        const article = await db.collection(ARTICLES).findOne({ name });
        await db.collection(ARTICLES).updateOne( { name }, {
            '$set': {
                comments: [...article.comments, { username, content }]
            }
        })
        const updatedArticle = await db.collection(ARTICLES).findOne({ name });
        res.status(200).json(updatedArticle);
    }, req, res);
});

// all request that ain't caught by any other api routes should be passed to our client app
app.get('*', (req: Request, res: Response): void => { res.sendFile(path.join(__dirname + '/build/index.html')) });

app.listen(8000, ()=> console.log('listening'));