var express = require('express');
var router = express.Router();
const { verifyToken } = require('../services/tokenService');
const { bucketController } = require('../controllers');

router.get('/', verifyToken, bucketController.getAllBuckets);
router.post('/', verifyToken, bucketController.createBucket);
router.get('/:bucketId', verifyToken, bucketController.getBucketById);
router.put('/:bucketId', verifyToken, bucketController.updateBucket);
router.delete('/:bucketId', verifyToken, bucketController.deleteBucket);

// member routes
router.get(
  '/:bucketId/member/:memberId',
  verifyToken,
  bucketController.findBucketMember
);
router.post('/:bucketId/member', verifyToken, bucketController.addBucketMember);
router.put(
  '/:bucketId/member/:memberId',
  verifyToken,
  bucketController.updateBucketMember
);
router.delete(
  '/:bucketId/member/:memberId',
  verifyToken,
  bucketController.deleteBucketMember
);

module.exports = router;
