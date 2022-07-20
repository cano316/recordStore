const mongoose = require('mongoose');

// Schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        enum: ['CD', 'LP', 'Cassette', 'Reel-To-Reel', '8-Track'],
        required: true
    },
    genre: {
        type: [String],
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;