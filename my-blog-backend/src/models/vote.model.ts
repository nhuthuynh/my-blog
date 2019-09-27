import mongoose, { Schema } from 'mongoose';

export const VoteSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    date: { type: Date, default: Date.now } 
});

export const Vote = mongoose.model("Vote", VoteSchema);