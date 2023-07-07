const { addToHistory, getFromHistory } = require('../controller/order');

const orderRouter = require('express').Router();

orderRouter.post('/add_history', addToHistory);
orderRouter.get('/get_history', getFromHistory);

module.exports = orderRouter;