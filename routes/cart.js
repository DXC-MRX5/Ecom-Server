const { getCartData, addToCart, deleteItem } = require('../controller/cart');

const cartRouter = require('express').Router();

cartRouter.get('/cart_data', getCartData);
cartRouter.post('/add_data', addToCart);
cartRouter.post('/delete_data', deleteItem);

module.exports = cartRouter;