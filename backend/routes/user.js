var express = require('express');
var router = express.Router();
const { verifyToken } = require('../services/tokenService');
const { userController } = require('../controllers');

router.get('/', verifyToken, userController.getAllUsers);
router.get('/:userId', verifyToken, userController.getUserById);
router.put('/', verifyToken, userController.updateUser);
router.delete('/', verifyToken, userController.deleteUser);

module.exports = router;
