const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const auth = require("../utilities/authorization");
const categoryController = require('../controllers/category.controller');

router.post('/', auth.authorized, upload.single('image'), categoryController.createCategory);
router.get('/', categoryController.getCategorys);
router.put('/:name', auth.authorized, upload.single('image'), categoryController.updateCategory);
router.delete('/:name', auth.authorized, categoryController.deleteCategory);

module.exports = router;