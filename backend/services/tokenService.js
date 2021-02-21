const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = (req, res, next) => {
  const token = req.header('Auth-Token');
  if (!token) return res.status(401).json('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json('Invalid Token');
  }
};

const getUserIdFromToken = async (req) => {
  const token = req.header('Auth-Token');
  if (!token) return null;

  try {
    const token = req.header('Auth-Token');
    const user = jwt.decode(token, process.env.TOKEN_SECRET);
    if (!user._id) return null;

    // check if id linked to user
    var existingUser = await User.findById(user._id).catch((err) =>
      console.log(err)
    );
    if (existingUser) return user._id;
  } catch (err) {
    console.log(err);
  }
  return null;
};

module.exports = {
  verifyToken,
  getUserIdFromToken
};
