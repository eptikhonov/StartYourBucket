var express = require('express');
var router = express.Router();
const { verifyToken } = require('../util/tokenHelper');
const { bucketController } = require('../controllers');

router.get('/', verifyToken, bucketController.getAllBuckets);
router.post('/', verifyToken, bucketController.createBucket);
router.get('/:bucketId', verifyToken, bucketController.getBucketById);
router.put('/:bucketId', verifyToken, bucketController.updateBucket);
router.delete('/:bucketId', verifyToken, bucketController.deleteBucket);

module.exports = router;
