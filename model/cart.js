const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    productIds: [String],
});

const CartModel = mongoose.model('cart', cartSchema);

module.exports = {
    CartModel
}
