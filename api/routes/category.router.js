const categoryController = require('../controllers/category.controller');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router();

router.route('/').get(
    verifyToken, 
    categoryController.findAllCategories
);
router.route('/post').post(
    categoryController.createCategory
);
router.route('/:id').get(
    categoryController.findCategoryById
);
router.route('/:id/update').patch(
    categoryController.updateCategory
);
router.route('/:id/delete').delete(
    categoryController.deleteCategory
);

module.exports = router;