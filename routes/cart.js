const { getCartData, addToCart } = require('../controller/cart');

const cartRouter = require('express').Router();

cartRouter.get('/cart_data', getCartData);
cartRouter.post('/add_data', addToCart);

module.exports = cartRouter;