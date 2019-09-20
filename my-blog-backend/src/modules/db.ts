import { MongoClient } from 'mongodb';
import { Response, Request, NextFunction } from 'express-serve-static-core';
import { DB_URL, DB_NAME } from '../constant';
import { errorHandler } from './errors';

const connectDB = async (url: string): Promise<any> => await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

export const operationWithDB = async (operations: Function, req: Request, res: Response, next?: NextFunction): Promise<void> => {
    try {
        const client = await connectDB(DB_URL);
        const db = client.db(DB_NAME);
        await operations(db);
        client.close();
    } catch(error) {
        errorHandler(error, req, res, next);
    }
}