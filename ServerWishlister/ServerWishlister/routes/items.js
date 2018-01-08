var express = require('express');
var util = require('util');
var router = express.Router();

var Item = require('./../lib/models/Item').Item;
var Type = require('./../lib/models/Type').Type;

/* GET home page. */
router.get('/', function (req, res, next) {
  Item.find({})
      .exec((err, items) => {
        if (err)
          res.status(404).json({ message: err.message });
        res.json(items);
      });
});

module.exports = router;