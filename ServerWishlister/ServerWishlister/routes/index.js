var express = require('express');
var util = require('util');
var router = express.Router();

var Item = require('./../lib/models/Item').Item;
var Type = require('./../lib/models/Type').Type;
var PriceRange = require('./../lib/models/PriceRange').PriceRange;
var User = require('./../lib/models/User').User;


router.get('/', function (req, res, next) {
  // Type.findOne({ name: "type1" }, (err, t) => {
  //   if (err)
  //     res.status(404).json({ message: err.message });
    //  var item = Item({ name: "item2", shop: "shop2", price: 55.45, type: "type2" });
    //  item.save((err) => {
    //    if (err)
    //      res.status(404).json({ message: err.message });
    //  });
  // });
  // Type.findOne({ name: "type2" }, (err, type) => {
  //   if (err)
  //     res.status(404).json({ message: err.message });
  //   var item = Item({ name: "item2", shop: "shop2", price: 123.321, type: t });
  //   item.save((err) => {
  //     if (err)
  //       res.status(404).json({ message: err.message });      
  //   });    
  // });
  res.json({ key: "VAL" });
});

router.get('/reInitializeDatabase', function(req, res, next){
  //var user = User({username: "admin", password})
})

module.exports = router;
