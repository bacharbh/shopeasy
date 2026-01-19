const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    specs: [String],
    thumbnails: [String],
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
