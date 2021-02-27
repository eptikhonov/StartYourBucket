const {
  Bucket,
  bucketValidation,
  updateBucketValidation,
  addBucketMemberValidation,
  updateBucketMemberValidation,
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
  },
  // bucket memeber
  findBucketMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to find a bucket member from an invalid user'
      });

    // check if user from token is a member
    const bucketId = req.params.bucketId;
    const isUserABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));

    if (!isUserABucketMember)
      return res
        .status(400)
        .json('User not permitted to find a member of bucket');

    // find member of bucket
    const userToFind = req.params.memberId;
    const memberFound = isUserABucketMember.members.find(
      (f) => f.id === userToFind
    );

    return res.status(200).json({ member: memberFound ? memberFound : null });
  },
  addBucketMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to add a bucket member from an invalid user'
      });

    // validate request body with schema
    const { error } = addBucketMemberValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // check if user from token is member of bucket
    const bucketId = req.params.bucketId;
    const isUserABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));
    if (!isUserABucketMember)
      return res
        .status(400)
        .json('User not permitted to add a member to bucket');

    // check if user is already a member
    const userToAdd = req.body;
    const isUserToAddABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userToAdd.id
    }).catch((err) => console.log(err));
    if (isUserToAddABucketMember)
      return res.status(400).json('User is already a member of this bucket');

    // update members list
    Bucket.findByIdAndUpdate(
      bucketId,
      {
        $push: { members: req.body }
      },
      { upsert: true },
      (err, bucket) => {
        if (err) return res.status(400).json(err);
        else {
          return res.status(200).json();
        }
      }
    );
  },
  updateBucketMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to update a bucket member from an invalid user'
      });

    // validate request body with schema
    const { error } = updateBucketMemberValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // check if user from token is a member of bucket
    const bucketId = req.params.bucketId;
    const isUserABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));
    if (!isUserABucketMember)
      return res
        .status(400)
        .json('User not permitted to update a member of bucket');

    const memberId = req.params.memberId;
    await Bucket.findById(bucketId, (err, bucket) => {
      if (err) console.log(err);
      else {
        bucket.members.forEach((member, i) => {
          if (member.id == memberId)
            bucket.members[i] = { id: memberId, ...req.body };
        });

        bucket.save((err, bucket) => {
          if (err) console.log(err);
          const bucketMemberUpdated = bucket.members.find(
            (f) => f.id === memberId
          );
          return res
            .status(200)
            .json({ member: bucketMemberUpdated ? bucketMemberUpdated : null });
        });
      }
    });
  },
  deleteBucketMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to remove a bucket member from an invalid user'
      });

    // check if user from token is admin member of bucket
    const bucketId = req.params.bucketId;
    const isUserABucketAdminMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound,
      'members.memberType': memberTypes.ADMIN
    }).catch((err) => console.log(err));
    if (!isUserABucketAdminMember)
      return res
        .status(400)
        .json('User not permitted to remove a member of bucket');

    // remove member from bucket
    const memberid = req.params.memberId;
    await Bucket.findById(bucketId, (err, bucket) => {
      if (err) console.log(err);
      else {
        bucket.members = bucket.members.filter((f) => f.id !== memberid);
        bucket.save((err, bucket) => {
          if (err) console.log(err);
          return res.status(200).json();
        });
      }
    });
  }
};

module.exports = bucketController;
