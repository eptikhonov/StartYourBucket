const { User, updateUserValidation } = require('../models');
const { getUserIdFromToken } = require('../services/tokenService');

const userController = {
  getAllUsers: async (req, res) => {
    await User.find({})
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  getUserById: async (req, res) => {
    const userId = req.params.userId;
    await User.findById(userId)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  updateUser: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to update user from an invalid user token.'
      });

    // validate request body with schema
    const { error } = updateUserValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    await User.findByIdAndUpdate(userIdFound, { $set: req.body })
      .then((data) => {
        return res.status(200).json({ user: userIdFound }); // return user id
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  deleteUser: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to delete a team from an invalid user'
      });

    await User.findByIdAndDelete(userIdFound)
      .then((data) => {
        return res.status(200).json();
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
};

module.exports = userController;
