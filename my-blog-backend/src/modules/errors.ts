import { Request, Response } from "express-serve-static-core";


export function errorHandler(error: any, req: Request, res: Response, next?: any) { 
    if (typeof error === "string") {
        return res.status(400).json({ message: error });
    }

    if (error.name === "UnauthorizedError") {
        return res.status(401).json({ message: 'Invalid Toke'});
    }

    return res.status(500).json({message: error.message});
}