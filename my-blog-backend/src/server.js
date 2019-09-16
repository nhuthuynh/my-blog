import express from 'express';
import bodyParser  from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'my-blog';
const ARTICLES = 'articles';

const connectDB = async (url) => await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/articles/:name', async (req, res) => {
    try {
        const { name } = req.params;    
        
        const client = await connectDB(DB_URL);
        const db = client.db(DB_NAME);
        const articleInfo = await db.collection(ARTICLES).findOne({ name });
        if (articleInfo)
            res.status(200).json(articleInfo);
        res.status(200).json({ message: `Article ${name} not found!`});
        
        client.close();
    } catch(ex) {
        res.status(500).json({ message: 'Error ', error: ex});
    }
});

app.post('/api/articles/', async (req, res) => {
    try {
        const { name, title, content } = req.body;
        const client = await connectDB(DB_URL);
        const db = client.db(DB_NAME);
        db.collection(ARTICLES).insert();
        client.close();
    } catch(ex) {
        res.status(500).json({ message: 'error', error: ex });
    }
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    try {
        const { name } = req.body;
        const client = await connectDB(DB_URL);
        const db = client.db(DB_NAME);
        const articleInfo = await db.collection(ARTICLES).findOne({ name });
        await db.collection(ARTICLES).updateOne({ name }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1
            }
        })
        const updateArticleInfo = await db.collection(ARTICLES).findOne({name});
        res.status(200).json(updateArticleInfo);
        client.close();
    } catch(ex) {
        res.status(500).json({ message: 'error', error: ex });
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    try {
        const { name, title, content } = req.body;
        const client = await connectDB(DB_URL);
        const db = client.db(DB_NAME);
        db.collection('articles').insert();
        client.close();
    } catch(ex) {
        res.status(500).json({ message: 'error', error: ex });
    }
});


app.listen(8000, ()=> console.log('listening'));