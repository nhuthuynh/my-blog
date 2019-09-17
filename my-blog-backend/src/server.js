import express from 'express';
import bodyParser  from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'my-blog';
const ARTICLES = 'articles';

const connectDB = async (url) => await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const withDB = async (operations, res) => {
    try {
        const client = await connectDB(DB_URL);
        const db = client.db(DB_NAME);
        await operations(db);
        client.close();
    } catch(ex) {
        res.status(500).json({ message: 'Error ', error: ex});
    }
}

app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
        const { name } = req.params;    
        const article = await db.collection(ARTICLES).findOne({ name });
        res.status(200).json(article);
    }, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    withDB(async (db) => {
        const { name } = req.body;
        const article = await db.collection(ARTICLES).findOne({ name });
        await db.collection(ARTICLES).updateOne({ name }, {
            '$set': {
                upvotes: article.upvotes + 1
            }
        });
        const updatedArticle = await db.collection(ARTICLES).findOne({name});
        res.status(200).json(updatedArticle);
    }, res);
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { username, content } = req.body;
    const { name } = req.params;
    
    withDB( async (db) => {
        const article = await db.collection(ARTICLES).findOne({ name });
        await db.collection(ARTICLES).updateOne( { name }, {
            '$set': {
                comments: [...article.comments, { username, content }]
            }
        })
        const updatedArticle = await db.collection(ARTICLES).findOne({ name });
        res.status(200).json(updatedArticle);
    }, res);
});


app.listen(8000, ()=> console.log('listening'));