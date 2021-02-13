var express = require('express');
var router = express.Router();
const { Team } = require('../models');
const { teamValidation } = require('../util/validation');
const { verifyToken, getUserIdFromToken } = require('../util/tokenHelper');
const jwt = require('jsonwebtoken');

// all teams
router.get('/', verifyToken, async (req, res) => {
  await Team.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// specific team info
router.get('/:teamId', verifyToken, async (req, res) => {
  const teamId = req.params.teamId;
  await Team.findById(teamId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/', verifyToken, async (req, res) => {
  // validate request body with schema
  const { error } = teamValidation(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    // check for existing team within user
    const name = req.body.name;
    const existingTeam = await Team.findOne({ name }).catch((err) =>
      console.log(err)
    );

    if (existingTeam)
      return res.status(400).json({ error: 'Team already exists' });

    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to create a team from invalid user.'
      });

    // create new team
    const team = new Team({
      ...req.body,
      members: [
        {
          id: userIdFound,
          unconfirmed: false,
          memberType: 'admin',
          deactivated: false
        }
      ]
    });

    await team
      .save()
      .then((data) => {
        res.status(200).json({ team: team._id }); // return new team id
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

module.exports = router;
