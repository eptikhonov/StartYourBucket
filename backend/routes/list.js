var express = require('express');
var router = express.Router();
const { verifyToken } = require('../services/tokenService');
const { listController } = require('../controllers');

router.get('/', verifyToken, listController.getAllLists);
router.post('/', verifyToken, listController.createList);
router.get('/:listId', verifyToken, listController.getListById);
router.put('/:listId', verifyToken, listController.updateList);
router.delete('/:listId', verifyToken, listController.deleteList);

module.exports = router;
