const { User } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    await User.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getUserById: async (req, res) => {
    const userId = req.params.userId;
    await User.findById(userId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports = userController;
