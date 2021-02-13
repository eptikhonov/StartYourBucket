var express = require('express');
var router = express.Router();
const { Bucket } = require('../models');
const { bucketValidation } = require('../util/validation');
const { verifyToken } = require('../util/tokenHelper');

// all buckets
router.get('/', verifyToken, async (req, res) => {
  await Bucket.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// specific bucket info
router.get('/:bucketId', verifyToken, async (req, res) => {
  const bucketId = req.params.bucketId;
  await Bucket.findById(bucketId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/', verifyToken, async (req, res) => {
  // validate request body with schema
  const { error } = bucketValidation(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    // check for existing bucket within user
    const name = req.body.name;
    const existingBucket = await Bucket.findOne({ name }).catch((err) =>
      console.log(err)
    );
    if (existingBucket)
      return res.status(400).json({ error: 'Bucket already exists' });

    // create new bucket
    const bucket = new Bucket({
      ...req.body
    });
    await bucket
      .save()
      .then((data) => {
        res.status(200).json({ bucket: bucket._id }); // return new bucket id
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

module.exports = router;
