const express = require('express');
const router = express.Router();
const auth = require("../utilities/authorization");
const wishlistController = require('../controllers/wishlist.controller');

router.post('/', auth.authorized, wishlistController.createWishlist);
router.get('/', wishlistController.getWishlists);
router.get('/:userId', wishlistController.getUserWishlist);
router.put('/', auth.authorized, wishlistController.addProduct);
router.delete('/:product', auth.authorized, wishlistController.removeProduct);

module.exports = router;
