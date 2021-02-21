const {
  List,
  listValidation,
  updateListValidation,
  Bucket,
  ListItem
} = require('../models');
const { getUserIdFromToken } = require('../services/tokenService');

const listController = {
  getAllLists: async (req, res) => {
    await List.find({})
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  getListById: async (req, res) => {
    const listId = req.params.listId;
    await List.findById(listId)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  createList: async (req, res) => {
    // validate request body with schema
    const { error } = listValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to create a list from an invalid user.'
      });

    const bucketId = req.body.idBucket;

    // check if user is member of bucket
    const isUserABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));
    if (!isUserABucketMember)
      return res.status(400).json({ error: 'User not a member of bucket' });

    // check for existing list within a bucket
    const title = req.body.title;
    const existingList = await List.findOne({
      title,
      idBucket: bucketId
    }).catch((err) => console.log(err));
    if (existingList)
      return res.status(400).json({ error: 'List already exists' });

    // create new list
    const list = new List({
      ...req.body
    });
    await list
      .save()
      .then((data) => {
        return res.status(200).json({ list: list._id }); // return new list id
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  updateList: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to update a list from an invalid user.'
      });

    // validate request body with schema
    const { error } = updateListValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const listId = req.params.listId;
    // get list from listId
    const listFound = await List.findById(listId).catch((err) =>
      console.log(err)
    );
    if (!listFound)
      return res
        .status(400)
        .json({ error: 'List cannot be found of list item' });

    // check if user is member of bucket from list
    const bucketId = listFound.idBucket;
    const isUserABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));

    if (!isUserABucketMember)
      return res.status(400).json({ error: 'User not a member of bucket' });

    await List.findByIdAndUpdate(listId, { $set: req.body })
      .then((data) => {
        return res.status(200).json({ list: listId }); // return list id
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  deleteList: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to delete a list from an invalid user'
      });

    const listId = req.params.listId;

    // get list
    const listFoud = await List.findById(listId).catch((err) =>
      console.log(err)
    );
    if (!listFoud)
      return res
        .status(400)
        .json({ error: 'List cannot be found for list deletion' });

    // check if user is admin of bucket
    const bucketId = listFoud.idBucket;
    const isUserABucketAdmin = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound,
      'members.memberType': 'admin'
    }).catch((err) => console.log(err));
    if (!isUserABucketAdmin)
      return res
        .status(400)
        .json({ error: 'Unable to delete list. User not an admin of bucket' });

    // delete all list items
    await ListItem.deleteMany({
      idBucketList: listId
    }).catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });

    // delete list
    await List.findByIdAndDelete(listId)
      .then((data) => {
        return res.status(200).json();
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
};

module.exports = listController;
