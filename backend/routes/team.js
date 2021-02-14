var express = require('express');
var router = express.Router();
const { verifyToken } = require('../util/tokenHelper');
const { teamController } = require('../controllers');

router.get('/', verifyToken, teamController.getAllTeams);
router.post('/', verifyToken, teamController.createTeam);
router.get('/:teamId', verifyToken, teamController.getTeamById);
router.put('/:teamId', verifyToken, teamController.updateTeam);
router.delete('/:teamId', verifyToken, teamController.deleteTeam);

module.exports = router;
