var express = require('express');
var util = require('util');
var router = express.Router();
var Item = require('./../lib/models/Item')

/* GET home page. */
router.get('/', function(req, res, next) {
  var newItem = Item({name: "newName"});
  newItem.save(function(err, Item){
    res.json(item);
  });
});

module.exports = router;
