const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config')
const auth = require("../utilities/authorization");
const productController = require('../controllers/product.controller');

router.post('/', auth.authorized, upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/filter', productController.getFilteredProducts);
router.get('/bestSellers', productController.getBestSellers);
router.get('/:id', productController.getProductById);
router.put('/:id', auth.authorized, upload.single('image'), productController.updateProduct);
router.delete('/:id', auth.authorized, productController.deleteProduct);

module.exports = router;