const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    productIds: [
        {
            Id: String,
            count: Number
        }
    ]
});

const CartModel = mongoose.model('cart', cartSchema);

module.exports = {
    CartModel
}
