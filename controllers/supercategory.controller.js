const supreCategoryModel = require('../models/supercategory.model');

exports.createSuperCategory = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        req.file ? (req.body.image = req.file.filename) : (req.body.image = "");
        const supercategory = await supreCategoryModel.create(req.body);
        return res.status(200).json(supercategory);
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

exports.getSuperCategorys = async (req, res) => {
  try {
    const supercategorys = await supreCategoryModel.find();
    return res.status(200).json(supercategorys);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.updateSuperCategory = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const updatedData = req.body;
        if (req.file) {
          updatedData.image = req.file.filename;
        }
        const newCategory = await supreCategoryModel.findOneAndUpdate(req.params, updatedData, { new: true })

        if (!newCategory) {
          return res.status(400).json({ error: "Can't find this supercategory" });
        }
        return res.status(200).json(newCategory);
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

exports.deleteSuperCategory = async (req, res) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const newCategory = await supreCategoryModel.findOneAndUpdate(req.params, {isDeleted: true}, { new: true })
        if (!newCategory) {
          return res.status(400).json({ error: "Can't find this supercategory" });
        }
        return res.status(200).json(newCategory);
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