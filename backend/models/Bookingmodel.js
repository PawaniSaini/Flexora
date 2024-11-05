const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    space: { type: Types.ObjectId, ref: 'space' },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, default: 'booked' },
    amount: Number,
    paymentMethod: String,
    createdAt: { type: Date, dafault: Date.now }
});

module.exports = model('booking', mySchema);
