'use strict'

var User = require('./../lib/models/User').User;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


exports.register = function (req, res) {
    var newUser = new User(req.body);
    //return res.json(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.role = 'user';
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
}

exports.signIn = function (req, res) {
  console.log(req.body);
    User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          } else {
            return res.json({token: jwt.sign({ username: user.username}, 'RESTFULAPIs'), role: user.role});
          }
        }
      });
 }

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
 }