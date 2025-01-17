const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const auth = require("../utilities/authorization");
const superCategoryController = require('../controllers/supercategory.controller');

router.post('/', auth.authorized, upload.single('image'), superCategoryController.createSuperCategory);
router.get('/', superCategoryController.getSuperCategorys);
router.put('/:name', auth.authorized, upload.single('image'), superCategoryController.updateSuperCategory);
router.delete('/:name', auth.authorized, superCategoryController.deleteSuperCategory);

module.exports = router;