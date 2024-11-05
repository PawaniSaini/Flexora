const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    status:String,
    createdAt: { type: Date, dafault: Date.now }
});

module.exports = model('user', mySchema);

