const express = require('express');
const Router = express.Router();
const ProductCtrl = require('../Controller/ProductCtrl');
const Auth = require('../Middlewares/Auth');
const AuthAdmin = require('../Middlewares/AuthAdmin');

Router.post('/add',Auth,AuthAdmin, ProductCtrl.addProduct);
Router.put('/update/:id',Auth,AuthAdmin,ProductCtrl.updateProduct);
// Router.put('/edit/:id', ProductCtrl.editProduct);
// Router.delete('/delete/:id', ProductCtrl.deleteProduct);
Router.get('/view/:id', ProductCtrl.viewProduct);
Router.get('/', ProductCtrl.getAllProducts);
Router.get('/search/:nameproducts', ProductCtrl.searchProducts);
Router.delete('/delete/:id', Auth, AuthAdmin, ProductCtrl.deleteProduct);

module.exports = Router;