var express = require('express');
var util = require('util');
var router = express.Router();

var PriceRange = require('./../lib/models/PriceRange').PriceRange;

/* GET home page. */
router.get('/', function (req, res, next) {
  PriceRange.find({}, function (err, priceRanges) {
    res.json(priceRanges);
  });
});

module.exports = router;
