const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    productIds: [
        {
            Id: String,
            count: Number
        }
    ]
});

const orderModel = mongoose.model('orderHistory', orderSchema);

module.exports = {
    orderModel
}
