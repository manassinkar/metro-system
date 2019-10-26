var express = require('express');
var router = express.Router();
var pC = require('../controllers/payment.controller');

router.post('/pay',pC.pay);

module.exports = router;