import mongoose, { Schema } from 'mongoose';
import { UserSchema } from './user.model';

export const ArticleSchema = new mongoose.Schema({
    name: String,
    author: UserSchema,
    title: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
});

export const Article = mongoose.model("Article", ArticleSchema);