// const authorizer = require('../authorizer/authorizer');
const { register, login, data } = require('../controller/user');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
// router.get('/get_data', authorizer, data);

module.exports = router;