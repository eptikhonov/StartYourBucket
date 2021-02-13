const { Bucket } = require('../models');
const { bucketValidation } = require('../util/validation');
const { getUserIdFromToken } = require('../util/tokenHelper');

const bucketController = {
  getAllBuckets: async (req, res) => {
    await Bucket.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getBucketById: async (req, res) => {
    const bucketId = req.params.bucketId;
    await Bucket.findById(bucketId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  createBucket: async (req, res) => {
    // validate request body with schema
    const { error } = bucketValidation(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      // get user id from token
      const userIdFound = await getUserIdFromToken(req);
      if (!userIdFound)
        return res.status(400).json({
          error: 'Unable to create a bucket from an invalid user.'
        });

      // check for existing bucket within user
      const name = req.body.name;
      const existingBucket = await Bucket.findOne({
        name,
        'members.id': userIdFound
      }).catch((err) => console.log(err));
      if (existingBucket)
        return res.status(400).json({ error: 'Bucket already exists' });

      // create new bucket
      const bucket = new Bucket({
        ...req.body,
        members: [
          {
            id: userIdFound,
            unconfirmed: false,
            memberType: 'admin',
            deactivated: false
          }
        ]
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
  }
};

module.exports = bucketController;
