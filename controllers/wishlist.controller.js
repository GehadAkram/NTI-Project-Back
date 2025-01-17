const wishlistModel = require("../models/wishlist.model");

exports.createWishlist = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const wishlist = await wishlistModel.create(req.body);
        return res.status(200).json(wishlist);
      } else {
        return res.status(401).json({ error: "Access Denied (Not Admin)" });
      }
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getWishlists = async (req, res) => {
  try {
    const wishlists = await wishlistModel.find();
    return res.status(200).json(wishlists);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getUserWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel.findOne({ user: req.params.userId });
    if (!wishlist) {
      return res.status(400).json({ error: "can't find this wishlist" });
    }
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.addProduct = async (req, res) => {
  try {
    if (req.user) {
      const wishlist = await wishlistModel.findOne({ user: req.user.userId });
      if (!wishlist) {
        return res.status(400).json({ error: "can't find this wishlist" });
      }
      if (!wishlist.products.includes(req.body.product)) {
        wishlist.products.push(req.body.product);
      }
      await wishlist.save();
      return res.status(200).json(wishlist);
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.removeProduct = async (req, res) => {
  try {
    if (req.user) {
      const wishlist = await wishlistModel.findOne({ user: req.user.userId });
      if (!wishlist) {
        return res.status(400).json({ error: "can't find this wishlist" });
      }
      const productIndex = wishlist.products.indexOf(req.params.product);
      if (productIndex > -1) {
        wishlist.products.splice(productIndex, 1);
      }
      await wishlist.save();
      return res.status(200).json(wishlist);
    } else {
      return res.status(401).json({ error: "Access Denied (Missing Token)" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}