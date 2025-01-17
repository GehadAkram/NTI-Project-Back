const categoryModel = require('../models/category.model');

exports.createCategory = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        req.file? req.body.image = req.file.filename : req.body.image = 'placeholder.svg';
        const category = await categoryModel.create(req.body);
        return res.status(200).json(category);
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

exports.getCategorys = async (req, res) => {
  try {
    const categorys = await categoryModel.find();
    return res.status(200).json(categorys);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.updateCategory = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const updatedData = req.body;
        if (req.file) {
          updatedData.image = req.file.filename;
        }
        const newCategory = await categoryModel.findOneAndUpdate(req.params, updatedData, {new: true});

        if (!newCategory) {
          return res.status(400).json({ error: "can't find this category" });
        }
        return res.status(200).json(newCategory);
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

exports.deleteCategory = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const newCategory = await categoryModel.findOneAndUpdate(req.params, {isActive: false, isDeleted: true}, {new: true});

        if (!newCategory) {
          return res.status(400).json({ error: "can't find this category" });
        }
        return res.status(200).json(newCategory);
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