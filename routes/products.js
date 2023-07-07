const express = require('express');
const { getProductById, getBestSeller, getItemsbyCategory, getSearchedProduct, getHomePageProducts } = require('../controller/products');

const productRouter = express.Router();

productRouter.get('/details', getProductById);
productRouter.get('/bestSeller', getBestSeller);
productRouter.get('/search/:searchedFor', getSearchedProduct);
productRouter.get('/home_page', getHomePageProducts);
productRouter.get('/:category', getItemsbyCategory);

module.exports = productRouter;