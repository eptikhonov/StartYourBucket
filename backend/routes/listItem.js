var express = require('express');
var router = express.Router();
const { verifyToken } = require('../services/tokenService');
const { listItemController } = require('../controllers');

router.get('/', verifyToken, listItemController.getAllListItems);
router.post('/', verifyToken, listItemController.createListItem);
router.get('/:listItemId', verifyToken, listItemController.getListItemById);
router.put('/:listItemId', verifyToken, listItemController.updateListItem);
router.delete('/:listItemId', verifyToken, listItemController.deleteListItem);

// member
router.post(
  '/:listItemId/member/:memberId',
  verifyToken,
  listItemController.addMemberToListItem
);
router.delete(
  '/:listItemId/member/:memberId',
  verifyToken,
  listItemController.removeMemberToListItem
);

module.exports = router;
