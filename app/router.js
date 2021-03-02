const express = require('express');

// importer les controllers
const productController = require('./controllers/productController');
const customerController = require('./controllers/customerController');
const orderController = require('./controllers/orderController');
const categoryController = require('./controllers/categoryController');
const sellerController = require('./controllers/sellerController');


const router = express.Router();

router.get('/', (req, res) => {
  res.send('HomePage');
});

/** Products */
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getOneProduct);
router.get('/seller/:id/products', productController.GetProductsFromSeller);


/* Customers */
router.get('/customer/:id', customerController.getOneCustomer);


/* Orders */
router.get('order/:id', orderController.getOneOrder);
router.get('/seller/:id/orders', orderController.getSellerOrders);
router.get('/customer/:id/orders', orderController.getCustomerOrders);



/* Categories */
router.get('/categories', categoryController.getAllCategories);


/* Sellers */
router.get('/sellers', sellerController.getAllSellers);
router.get('/sellers/:id', sellerController.getOneSeller);


router.use((req, res) => {
  res.status(404).send('Page 404');
});

module.exports = router;