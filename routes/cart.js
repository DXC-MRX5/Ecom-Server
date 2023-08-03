const { getCartData, addToCart, deleteItem, increament, decreament } = require('../controller/cart');

const cartRouter = require('express').Router();

cartRouter.get('/cart_data', getCartData);
cartRouter.post('/add_data', addToCart);
cartRouter.post('/delete_data', deleteItem);
cartRouter.post('/increase_data', increament);
cartRouter.post('/decrease_data', decreament);

module.exports = cartRouter;