const orderStateModel = require('../models/orderState.model');

exports.createOrderState = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const state = await orderStateModel.create(req.body)
        return res.status(200).json(state);
      } else {   
        return res.status(401).json({ error: "Access Denied (Not Admin)" });
      }
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getOrderStates = async (req, res) => {
  try {
    const states = await orderStateModel.find();
    return res.status(200).json(states);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.updateOrderState = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const newState = await orderStateModel.findOneAndUpdate(req.params, {state: req.body.state}, {new:true})
        if (!newState) {
          return res.status(400).json({ error: "can't find this order state" });
        }
        return res.status(200).json(newState);
      } else {   
        return res.status(401).json({ error: "Access Denied (Not Admin)" });
      }
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.deleteOrderState = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const state = await orderStateModel.findOneAndUpdate(req.params, {isDeleted: true}, {new:true})
        if (!state) {
          return res.status(400).json({ error: "can't find this order state" });
        }
        return res.status(200).json(state);
      } else {   
        return res.status(401).json({ error: "Access Denied (Not Admin)" });
      }
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}