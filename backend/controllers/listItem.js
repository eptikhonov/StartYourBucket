const {
  List,
  listItemValidation,
  updateListItemValidation,
  Bucket,
  ListItem
} = require('../models');
const { getUserIdFromToken } = require('../services/tokenService');

const listItemController = {
  getAllListItems: async (req, res) => {
    await ListItem.find({})
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  getListItemById: async (req, res) => {
    const listItemId = req.params.listItemId;
    await ListItem.findById(listItemId)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  createListItem: async (req, res) => {
    // validate request body with schema
    const { error } = listItemValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to create a list item from an invalid user.'
      });

    // get list from listId
    const listId = req.body.idBucketList;
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

    // check for existing list item within a list
    const title = req.body.title;
    const existingListItem = await ListItem.findOne({
      title,
      idBucketList: listId
    }).catch((err) => console.log(err));
    if (existingListItem)
      return res.status(400).json({ error: 'List Item already exists' });

    // create new list item
    const listItem = new ListItem({
      ...req.body
    });
    await listItem
      .save()
      .then((data) => {
        return res.status(200).json({ listItem: listItem._id }); // return new list item id
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  updateListItem: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to update a list from an invalid user.'
      });

    // validate request body with schema
    const { error } = updateListItemValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const listItemId = req.params.listItemId;
    const listItemFound = await ListItem.findById(listItemId).catch((err) =>
      console.log(err)
    );
    if (!listItemFound)
      return res
        .status(400)
        .json({ error: 'List Item cannot be found for update' });

    const listId = listItemFound.idBucketList;
    const listFound = await List.findById(listId).catch((err) =>
      console.log(err)
    );
    if (!listFound)
      return res
        .status(400)
        .json({ error: 'List cannot be found of list item for update' });

    // check if user is member of bucket from list
    const bucketId = listFound.idBucket;
    const isUserABucketMember = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));

    if (!isUserABucketMember)
      return res.status(400).json({ error: 'User not a member of bucket' });

    await ListItem.findByIdAndUpdate(listItemId, { $set: req.body })
      .then((data) => {
        return res.status(200).json({ listItem: listItemId }); // return list item id
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  deleteListItem: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to delete a list from an invalid user'
      });

    const listItemId = req.params.listItemId;

    // get list item
    const listItemFound = await ListItem.findById(listItemId).catch((err) =>
      console.log(err)
    );
    if (!listItemFound)
      return res
        .status(400)
        .json({ error: 'List Item cannot be found for deletion' });

    // get list from id found
    const listFoud = await List.findById(
      listItemFound.idBucketList
    ).catch((err) => console.log(err));
    if (!listFoud)
      return res
        .status(400)
        .json({ error: 'List cannot be found for list item deletion' });

    // check if user is admin of bucket
    const bucketId = listFoud.idBucket;
    const isUserABucketAdmin = await Bucket.findOne({
      _id: bucketId,
      'members.id': userIdFound,
      'members.memberType': 'admin'
    }).catch((err) => console.log(err));
    if (!isUserABucketAdmin)
      return res.status(400).json({
        error: 'Unable to delete list item. User not an admin of bucket'
      });

    // delete list item
    await ListItem.findByIdAndDelete(listItemId)
      .then((data) => {
        return res.status(200).json();
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
};

module.exports = listItemController;
