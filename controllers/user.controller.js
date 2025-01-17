const userModel = require('../models/user.model');
const hashing = require('../utilities/hashing');
const auth = require('../utilities/authorization');
const e = require('express');

exports.createUser = async (req, res) => {
  try {
    req.body.password = await hashing.hashPassword(req.body.password);
    const user = await userModel.create(req.body);
    const wishlistModel = require("../models/wishlist.model");
    const wishlist = await wishlistModel.create({ user: user._id });
    return res.status(201).json({user, wishlist});
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json(users);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "can't find this user" });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const newUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!newUser) {
      return res.status(400).json({ error: "can't find this user" });
    }
    return res.status(200).json(newUser);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, { isSuspended: true }, { new: true });
    if (!user) {
      return res.status(400).json({ error: "can't find this user" });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await hashing.comparePassword(req.body.password, user.password);
      if (isMatch) {
        const token = await auth.createToken({ userId: user._id, isAdmin: user.isAdmin });
        return res.status(200).json({ token: token });
      }
      else {
        return res.status(400).json({ notfound: "Wrong Email or Password" });
      }
    }
    else {
      return res.status(400).json({ notfound: "Wrong Email or Password" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}