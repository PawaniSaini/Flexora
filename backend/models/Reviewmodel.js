const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    space: { type: Types.ObjectId, ref: 'space' },
    rating: Number,
    comment: String,
    createdAt: { type: Date, dafault: Date.now }
});

module.exports = model('review', mySchema);