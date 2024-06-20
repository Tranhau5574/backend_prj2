const express = require('express');
const Router = express.Router();
const OrderCtrl = require('../Controller/OrderCtrl');
const Auth = require('../Middlewares/Auth');
const AuthAdmin = require('../Middlewares/AuthAdmin');

Router.get('/view',Auth, AuthAdmin, OrderCtrl.getAllOrders); 
Router.post('/add',Auth, OrderCtrl.addOrder);
Router.get('/view-order', Auth, OrderCtrl.viewOrderByUserId);
Router.put("/update-status",Auth, AuthAdmin, OrderCtrl.updateOrderStatus);
Router.post('/send-order-confirmation-email', OrderCtrl.sendOrderConfirmationEmail);
      

module.exports = Router;
