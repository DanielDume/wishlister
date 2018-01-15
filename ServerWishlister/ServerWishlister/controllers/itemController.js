

'use strict'


var Item = require('./../lib/models/Item').Item;
var User = require('./../lib/models/User').User;
var socketServer = require('./../notifications');
socketServer.getServer();
var broadcast = socketServer.changeOccured;

// setInterval(function(){
//     broadcast("Periodic notification");
// }, 20000)

exports.getAllItems = function (req, res) {
    console.log(req.query.username);
    User.findOne({ username: req.query.username })
        .populate('items')
        .exec((err, user) => {
            console.log({ items: user.items });
            res.json({ items: user.items });
        });
    // Item.find({})
    //     .exec((err, items) => {
    //         if (err)
    //             res.status(404).json({ message: err.message });
    //         res.json({items : items});
    //     });
}

exports.getAllItemsJava = function (req, res) {
    console.log(req.query.username);
    User.findOne({ username: req.query.username })
        .populate('items')
        .exec((err, user) => {
            console.log({ items: JSON.stringify(user.items)});
            res.json({ items: JSON.stringify(user.items)});
        });
}

exports.deleteItem = function (req, res) {

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            res.json(err);
        }
        else {
            for (let index = 0; index < user.items.length; index++) {
                const element = user.items[index];
                if (element._id == req.body._id) {
                    user.items.splice(index, 1);
                    break;
                }
            }
            user.save(function (err, user) {
                Item.remove({ _id: req.body._id }, function (err) {
                    if (err) {
                        res.json(err);
                    } else {
                        broadcast("Succesfully deleted the item");
                        res.json("Succesfully deleted");
                    }
                });
            })
        }
    });

}

exports.editItem = function (req, res) {
    console.log(req.body);
    Item.findOne({ _id: req.body._id }, function (err, item) {
        if (err) {
            res.json(err);
        } else {
            if (item) {
                item.name = req.body.name;
                item.type = req.body.type;
                item.price = req.body.price;
                item.shop = req.body.shop;
                item.save(function (err, item) {
                    if (err) {
                        res.json(err);
                    } else {
                        broadcast("Succesfully edited item " + item.name);
                        res.json({ item: item });
                    }
                });
            } else {
                res.json({ message: "Error updating item" });
            }
        }
    })
}

exports.addItem = function (req, res) {
    console.log(req.body);
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            res.json(err);
        }
        else {
            var newItem = Item({
                user: user,
                name: req.body.name,
                type: req.body.type,
                shop: req.body.shop,
                price: req.body.price,
            });
            newItem.save(function (err, item) {
                if (err) {
                    res.json(err);
                } else {
                    user.items.push(item._id);
                    user.save(function (err, savedUser) {
                        if (err) {
                            res.json(err);
                        } else {
                            broadcast("Succesfully added " + item.name);
                            res.json({ item: item });
                        }
                    });
                }
            });
        }
    });
}