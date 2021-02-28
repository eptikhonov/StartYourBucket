var express = require('express');
var router = express.Router();
const { verifyToken } = require('../services/tokenService');
const { teamController } = require('../controllers');

router.get('/', verifyToken, teamController.getAllTeams);
router.post('/', verifyToken, teamController.createTeam);
router.get('/:teamId', verifyToken, teamController.getTeamById);
router.put('/:teamId', verifyToken, teamController.updateTeam);
router.delete('/:teamId', verifyToken, teamController.deleteTeam);

// member routes
router.get(
  '/:teamId/member/:memberId',
  verifyToken,
  teamController.findTeamMember
);
router.post('/:teamId/member', verifyToken, teamController.addTeamMember);
router.put(
  '/:teamId/member/:memberId',
  verifyToken,
  teamController.updateTeamMember
);
router.delete(
  '/:teamId/member/:memberId',
  verifyToken,
  teamController.deleteTeamMember
);

// bucket
router.post(
  '/:teamId/bucket/:bucketId',
  verifyToken,
  teamController.addBucketToTeam
);
router.delete(
  '/:teamId/bucket/:bucketId',
  verifyToken,
  teamController.removeBucketToTeam
);

module.exports = router;
