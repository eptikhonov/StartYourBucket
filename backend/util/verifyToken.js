const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
