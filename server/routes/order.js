const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');

router.post('/', orderController.postOrder);


module.exports = router;
