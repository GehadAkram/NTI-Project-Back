const express = require('express');
const router = express.Router();
const auth = require("../utilities/authorization");
const orderStateController = require('../controllers/orderState.controller');

router.post('/', auth.authorized, orderStateController.createOrderState);
router.get('/', orderStateController.getOrderStates);
router.put('/:state', auth.authorized, orderStateController.updateOrderState);
router.delete('/:state', auth.authorized, orderStateController.deleteOrderState);

module.exports = router;