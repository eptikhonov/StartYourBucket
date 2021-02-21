const authController = require('./auth');
const userController = require('./user');
const teamController = require('./team');
const bucketController = require('./bucket');
const listController = require('./list');
const listItemController = require('./listItem');

module.exports = {
  authController,
  userController,
  teamController,
  bucketController,
  listController,
  listItemController
};
