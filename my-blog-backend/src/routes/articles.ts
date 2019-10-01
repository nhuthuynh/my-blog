import { operationWithDB } from '../modules/db';
import { Response, Request } from 'express-serve-static-core';
import { ARTICLES } from '../constant';
import { Article } from '../models/article.model';
import { MongooseDocument } from 'mongoose';
import { Router } from 'express';

const router = Router();

router.post('/api/articles', async (req: Request, res: Response): Promise<void> => {
    const newArticle = new Article(req.body);
    newArticle.save((error: Error, article: MongooseDocument) => {
        if (error) { res.send(error); }
        res.status(200).json({ success: true, data: article });
    });
});

router.get('/api/articles', async (req: Request, res: Response):Promise<void> => {
    Article.find({}, (error: Error, articles: MongooseDocument) => {
        if (error) { res.send(error); }
        res.status(200).json({ success: true, data: articles });
    });
});

router.get('/api/articles/:name', async  (req: Request, res: Response): Promise<void> => {
    operationWithDB(async (db: any) => {
        const { name } = req.params;    
        const article = await db.collection(ARTICLES).findOne({ name });
        res.status(200).json(article);
    }, req, res);
});

router.post('/api/articles/:name/upvote', async  (req: Request, res: Response): Promise<void> => {
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
});

router.use('/api/articles/:name/comments', async (req: Request, res: Response): Promise<void> => {
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
})

export default router;
