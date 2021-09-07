const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router();

router.route('/').get(userController.findAllUsers)
router.route('/create').post(userController.createUser)
router.route('/:id').get(userController.findUserById)
router.route('/:id/validate').patch(userController.validateUser)




module.exports = router;