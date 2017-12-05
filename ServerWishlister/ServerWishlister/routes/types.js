var express = require('express');
var util = require('util');
var router = express.Router();

var Type = require('./../lib/models/Type').Type;

router.get('/', (req, res) => {
    Type.find({}, function (err, types) {
        res.json(types);
    });
});

router.post('/', (req, res) => {
    var newType = Type({ name: req.body.name });
    newType.save((err) => {
        if (err)
            res.status(404).json({ message: err.message });
        res.json({ message: "Succesfully added a type" });
    });
});

router.delete('/:id', (req, res) => {
    Type.findById(req.params.id, (err, type) => {
        if (err)
            res.status(404).json({ message: err.message });
    });
    Type.findByIdAndRemove(req.params.id).exec();
});

router.put('/:id', (req, res) => {
    Type.findById(req.params.id, (err, type) => {
        if (err)
            res.status(404).json({ message: err.message });
        if (req.body.name)
            type.name = req.body.name;
        type.save((err) => {
            if (err)
                res.status(404).json({ message: err.message });
            res.json({ message: "Deleted a type." });
        })
    });
});

module.exports = router;
