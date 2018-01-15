'use strict';
module.exports = function (app) {
    var itemController = require('../controllers/itemController');
    var userController = require('../controllers/userController');

    // todoList Routes
    app.route('/items')
        .get(userController.loginRequired, itemController.getAllItems)
        .post(userController.loginRequired, itemController.addItem)
        .put(userController.loginRequired, itemController.editItem)
        .delete(userController.loginRequired, itemController.deleteItem);
    app.route('/auth/register')
        .post(userController.register);
    app.route('/auth/signIn')
        .post(userController.signIn);
    app.route('/itemsJava')
        .get(userController.loginRequired, itemController.getAllItemsJava);

};
