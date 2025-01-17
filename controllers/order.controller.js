const orderModel = require('../models/order.model');

exports.createOrder = async (req, res) => {
  try {
    if (req.user) {
      const order = await orderModel.create(req.body);
      return res.status(200).json(order);
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getOrders = async (req, res) => {
  try {
    if (req.user) {
      const orders = await orderModel.find();
      return res.status(200).json(orders);
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getUserOrders = async (req, res) => {
  try {
    if (req.user) {
      const userOrders = await orderModel.find({ userId: req.user._id });
      return res.status(200).json(userOrders);
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getCart = async (req, res) => {
  try {
    if (req.user) {
      const pendingState = '67864b3921f4118a4da25e7e';
      const cartOrders = await orderModel.find({ userId: req.user._id, state: pendingState });
      return res.status(200).json(cartOrders);
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.updateOrder = async (req, res) => {
  try {
    if (req.user) {
      const newOrder = await orderModel.findOneAndUpdate(req.params, req.body, {new: true});
      if (!newOrder) {
        return res.status(400).json({ error: "can't find this order" });
      }
      return res.status(200).json(newOrder);
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    if (req.user) {
      const cancelState= '67864b7521f4118a4da25e88';
      const newOrder = await orderModel.findOneAndUpdate(req.params, {state: cancelState}, {new: true});

      if (!newOrder) {
        return res.status(400).json({ error: "can't find this order" });
      }
      return res.status(200).json(newOrder);
    } else {
      return res.status(401).json({ error: "Access Denied (Not Admin)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}