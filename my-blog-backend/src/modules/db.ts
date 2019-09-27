import { Response, Request, NextFunction } from 'express-serve-static-core';
import { DB_URL, DB_NAME } from '../constant';
import { errorHandler } from './errors';
import mongoose from 'mongoose';

export const connectDB = async (): Promise<any> => {
    mongoose.Promise = global.Promise;
    mongoose.connect(DB_URL, { useNewUrlParser: true });
}

export const operationWithDB = async (operations: Function, req: Request, res: Response, next?: NextFunction): Promise<void> => {
    try {
        
        const client = await connectDB();
        const db = client.db(DB_NAME);
        await operations(db);
        client.close();
    } catch(error) {
        errorHandler(error, req, res, next);
    }
}