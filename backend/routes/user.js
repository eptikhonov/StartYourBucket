var express = require('express');
var router = express.Router();
const { User } = require('../models/User');
const verifyToken = require('../util/verifyToken');

// all users
router.get('/', verifyToken, async (req, res) => {
  await User.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// user info
router.get('/:userId', verifyToken, async (req, res) => {
  const userId = req.params.userId;
  await User.findById(userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
