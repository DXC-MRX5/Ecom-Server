const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    poster: String,
    name: String,
    description: String,
    category: String,
    price: Number,
    rating: Number
});

const ProductsModel = mongoose.model('products', productSchema);

module.exports = {
    ProductsModel
}