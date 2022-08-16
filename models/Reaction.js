const {Schema} = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    author: { type: String, required: false },
    publisher: String,
    stockCount: Number,
    price: Number,
    inStock: Boolean,
    lastAccessed: { type: Date, default: Date.now },
  });