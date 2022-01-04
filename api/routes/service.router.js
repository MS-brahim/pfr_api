const serviceController = require('../controllers/service.controller');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router();

router.route('/').get(
    serviceController.findAllServices
);
router.route('/post').post(
    serviceController.createService
);
router.route('/:id').get(
    serviceController.findServiceById
);
router.route('/search/all/:from/:to').post(
    serviceController.searchByFromTo
);
router.route('/:id/update').patch(
    serviceController.updateService
);
router.route('/:id/delete').delete(
    serviceController.deleteService
);

module.exports = router;