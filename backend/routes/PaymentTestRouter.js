const express = require('express');
const router = express.Router();
const {HandlerPayment} = require('../controllers/paymentTestController');

router.post('/payment', HandlerPayment);

module.exports = router;