var express = require('express');
var router = express.Router();
const { verifyToken } = require('../util/tokenHelper');
const { teamController } = require('../controllers');

router.get('/', verifyToken, teamController.getAllTeams);

router.get('/:teamId', verifyToken, teamController.getTeamById);

router.post('/', verifyToken, teamController.createTeam);

module.exports = router;
