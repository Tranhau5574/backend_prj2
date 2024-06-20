const express = require('express');
const Router = express.Router();
const UserCtrl = require('../Controller/UserCtrl');
const auth = require('../Middlewares/Auth');

Router.post('/login', UserCtrl.login);
// Router.route('/login')
// .post(UserCtrl.login);
Router.get('/logout', UserCtrl.logout);
Router.post('/signup', UserCtrl.signup);
Router.post('/cart',auth, UserCtrl.addToCart);
Router.delete('/cart/:id', auth, UserCtrl.deleteFromCart);
Router.get('/cart', auth, UserCtrl.getCart);
Router.get('/infor', auth, UserCtrl.getUser);
Router.delete('/deleteAllCart', auth, UserCtrl.deleteAllCart);

module.exports = Router;