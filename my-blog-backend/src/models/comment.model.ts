import mongoose, { Schema } from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    content: String,
    date: { type: Date, default: Date.now }
});

export const Comment = mongoose.model("Comment", CommentSchema);