const authController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router();

router.route('/login').post(
    authController.login
);
router.route('/:id').get(
    authController.getAuthById
);




module.exports = router;