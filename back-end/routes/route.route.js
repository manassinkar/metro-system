var express = require('express');
var router = express.Router();
var rC = require('../controllers/route.controller');

router.post('/addRoute',rC.addRoute);

module.exports = router;