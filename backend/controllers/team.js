const { Team, teamValidation, updateTeamValidation } = require('../models');
const { getUserIdFromToken } = require('../util/tokenHelper');

const teamController = {
  getAllTeams: async (req, res) => {
    await Team.find({})
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  getTeamById: async (req, res) => {
    const teamId = req.params.teamId;
    await Team.findById(teamId)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  createTeam: async (req, res) => {
    // validate request body with schema
    const { error } = teamValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to create a team from an invalid user.'
      });

    // check for existing team within user
    const name = req.body.name;
    const existingTeam = await Team.findOne({
      name,
      'members.id': userIdFound
    }).catch((err) => console.log(err));

    if (existingTeam)
      return res.status(400).json({ error: 'Team already exists' });

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
        return res.status(200).json({ team: team._id }); // return new team id
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
  updateTeam: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to update a team from an invalid user.'
      });

    // validate request body with schema
    const { error } = updateTeamValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // check if user is member of team
    const teamId = req.params.teamId;
    const isUserATeamMember = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));
    if (!isUserATeamMember)
      return res.status(400).json('User not a member of team');

    await Team.findByIdAndUpdate(teamId, { $set: req.body })
      .then((data) => {
        return res.status(200).json({ team: teamId }); // return team id
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  deleteTeam: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to delete a team from an invalid user'
      });

    // check if user is admin of team
    const teamId = req.params.teamId;
    const isUserATeamAdmin = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound,
      'members.memberType': 'admin'
    }).catch((err) => console.log(err));
    if (!isUserATeamAdmin)
      return res
        .status(400)
        .json('Unable to delete team. User not an admin of team');

    await Team.findByIdAndDelete(teamId)
      .then((data) => {
        return res.status(200).json();
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
};

module.exports = teamController;
