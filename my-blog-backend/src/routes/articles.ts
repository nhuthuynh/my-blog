import { operationWithDB } from '../modules/db';
import { Response, Request } from 'express-serve-static-core';
import { ARTICLES } from '../constant';

const insert = async (req: Request, res: Response): Promise<void> => {
    operationWithDB(async (db: any) => {
        const { name, title, content } = req.body;
        await db.collection(ARTICLES).insert({ name, title, content, upvotes: 0, comments: [] });
        res.status(200).json({ success: true });
    }, req, res);
}

const findByName = async  (req: Request, res: Response): Promise<void> => {
    operationWithDB(async (db: any) => {
        const { name } = req.params;    
        const article = await db.collection(ARTICLES).findOne({ name });
        res.status(200).json(article);
    }, req, res);
}

const upvote = async  (req: Request, res: Response): Promise<void> => {
    operationWithDB(async (db: any) => {
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
}

const comment = async (req: Request, res: Response): Promise<void> => {
    const { username, content } = req.body;
    const { name } = req.params;
    
    operationWithDB( async (db: any) => {
        const article = await db.collection(ARTICLES).findOne({ name });
        await db.collection(ARTICLES).updateOne( { name }, {
            '$set': {
                comments: [...article.comments, { username, content }]
            }
        })
        const updatedArticle = await db.collection(ARTICLES).findOne({ name });
        res.status(200).json(updatedArticle);
    }, req, res);
}

export default {
    insert: {
        requestMethod: 'post',
        routeUrl: '/api/articles',
        func: insert
    },
    findByName: {
        requestMethod: 'get',
        routeUrl: '/api/articles/:name',
        func: findByName
    },
    upvote: {
        requestMethod: 'post',
        routeUrl: '/api/articles/:name/upvote',
        func: upvote
    },
    comment: {
        requestMethod: 'post',
        routeUrl: '/api/articles/:name/comments',
        func: comment
    }
}