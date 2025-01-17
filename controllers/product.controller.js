const e = require('express');
const productModel = require('../models/product.model');

exports.createProduct = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        req.file? req.body.image = req.file.filename : req.body.image = 'placeholder.svg';
        if (req.body.quantity === 0) {
          req.body.inStock = false;
        }
        else {
          req.body.inStock = true;
        }
        const product = await productModel.create(req.body)
        return res.status(200).json(product);
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

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate('category', 'name').populate('supercategory', 'name');
    return res.status(200).json(products);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate('category', 'name').populate('supercategory', 'name');;
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getFilteredProducts = async (req, res) => {
  try {
    const { category, supercategory, maxPrice } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (supercategory) {
      filter.supercategory = supercategory;
    }
    if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }

    const products = await productModel.find(filter).populate('category', 'name').populate('supercategory', 'name');
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getBestSellers = async (req, res) => {
  try {
    const bestSellers = await productModel.find({ isBestSeller: true }).populate('category', 'name').populate('supercategory', 'name');
    return res.status(200).json(bestSellers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.updateProduct = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const updatedData = req.body;
        if (req.file) {
          updatedData.image = req.file.filename;
        }
        if (req.body.quantity === 0) {
          updatedData.inStock = false;
        }
        else {
          updatedData.inStock = true;
        }
        const newProduct = await productModel.findByIdAndUpdate(req.params.id, updatedData,{new: true});
        
        if (!newProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(newProduct);
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

exports.deleteProduct = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const product = await productModel.findByIdAndUpdate(req.params.id, {isActive: false, isDeleted: true,}, {new: true});
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
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