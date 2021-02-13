var express = require('express');
var router = express.Router();
const { verifyToken } = require('../util/tokenHelper');
const { bucketController } = require('../controllers');

router.get('/', verifyToken, bucketController.getAllBuckets);

router.get('/:bucketId', verifyToken, bucketController.getBucketById);

router.post('/', verifyToken, bucketController.createBucket);

module.exports = router;
