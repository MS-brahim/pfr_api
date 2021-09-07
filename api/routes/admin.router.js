const adminController = require('../controllers/admin.controller');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router();

router.route('/register').post(adminController.register)
router.route('/login').post(adminController.login)
router.route('/:id').get(adminController.getAdminById)

module.exports = router;