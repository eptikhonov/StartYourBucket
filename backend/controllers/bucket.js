const {
  Bucket,
  bucketValidation,
  updateBucketValidation,
  List,
  ListItem
} = require('../models');
const { getUserIdFromToken } = require('../services/tokenService');
const { memberTypes } = require('../variables/enums');

const bucketController = {
  getAllBuckets: async (req, res) => {
    await Bucket.find({})
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  getBucketById: async (req, res) => {
    const bucketId = req.params.bucketId;

    // load in all lists and list items of bucket
    const lists = await List.find({ idBucket: bucketId }).catch((err) => {
      return res.status(400).json(err);
    });

    lists.forEach(async (list) => {
      const listItems = await ListItem.find({ idBucketList: list._id }).catch(
        (err) => {
          return res.status(400).json(err);
        }
      );
      list.itemsList = listItems;
    });

    await Bucket.findById(bucketId)
      .then((data) => {
        data.lists = lists;
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  createBucket: async (req, res) => {
    // validate request body with schema
    const { error } = bucketValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
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
          memberType: memberTypes.ADMIN,
          deactivated: false
        }
      ]
    });
    await bucket
      .save()
      .then((data) => {
        return res.status(200).json({ bucket: bucket._id }); // return new bucket id
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  updateBucket: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to update a bucket from an invalid user.'
      });

    // validate request body with schema
    const { error } = updateBucketValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // check if user is member of bucket
    const bucketId = req.params.bucketId;
    const isUserABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));
    if (!isUserABucketMember)
      return res.status(400).json('User not a member of bucket');

    await Bucket.findByIdAndUpdate(bucketId, { $set: req.body })
      .then((data) => {
        return res.status(200).json({ bucket: bucketId }); // return bucket id
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  deleteBucket: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to delete a bucket from an invalid user'
      });

    // check if user is admin of bucket
    const bucketId = req.params.bucketId;
    const isUserABucketAdmin = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound,
      'members.memberType': memberTypes.ADMIN
    }).catch((err) => console.log(err));
    if (!isUserABucketAdmin)
      return res
        .status(400)
        .json('Unable to delete bucket. User not an admin of bucket');

    await Bucket.findByIdAndDelete(bucketId)
      .then((data) => {
        return res.status(200).json();
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
};

module.exports = bucketController;
