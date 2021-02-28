const {
  Team,
  teamValidation,
  updateTeamValidation,
  addMemberValidation,
  updateMemberValidation
} = require('../models');
const { getUserIdFromToken } = require('../services/tokenService');
const { memberTypes } = require('../variables/enums');

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
          memberType: memberTypes.ADMIN,
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
      'members.memberType': memberTypes.ADMIN
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
  },
  // team member
  findTeamMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to find a team member from an invalid user'
      });
    // check if user from token is a member
    const teamId = req.params.teamId;
    const isUserATeamMember = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));
    if (!isUserATeamMember)
      return res
        .status(400)
        .json('User not permitted to find a member of team');
    // find member of team
    const memberToFind = req.params.memberId;
    const memberFound = isUserATeamMember.members.find(
      (f) => f.id === memberToFind
    );
    return res.status(200).json({ member: memberFound ? memberFound : null });
  },
  addTeamMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to add a team member from an invalid user'
      });

    // validate request body with schema
    const { error } = addMemberValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // check if user from token is member of team
    const teamId = req.params.teamId;
    const isUserATeamMember = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));
    if (!isUserATeamMember)
      return res.status(400).json('User not permitted to add a member to team');

    // check if user is already a member
    const memberToAdd = req.body;
    const isMemberToAddATeamMember = await Team.findOne({
      _id: teamId,
      'members.id': memberToAdd.id
    }).catch((err) => console.log(err));
    if (isMemberToAddATeamMember)
      return res.status(400).json('User is already a member of this team');

    // update members list
    Team.findByIdAndUpdate(
      teamId,
      {
        $push: { members: req.body }
      },
      { upsert: true },
      (err, team) => {
        if (err) return res.status(400).json(err);
        else {
          return res.status(200).json();
        }
      }
    );
  },
  updateTeamMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to update a team member from an invalid user'
      });

    // validate request body with schema
    const { error } = updateMemberValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // check if user from token is a member of team
    const teamId = req.params.teamId;
    const isUserATeamMember = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound
    }).catch((err) => console.log(err));

    if (!isUserATeamMember)
      return res
        .status(400)
        .json('User not permitted to update a member of team');

    // update member in team
    const memberId = req.params.memberId;
    await Team.findById(teamId, (err, team) => {
      if (err) console.log(err);
      else {
        team.members.forEach((member, i) => {
          if (member.id == memberId)
            team.members[i] = { id: memberId, ...req.body };
        });
        team.save((err, team) => {
          if (err) console.log(err);
          const teamMemberUpdated = team.members.find((f) => f.id === memberId);
          return res
            .status(200)
            .json({ member: teamMemberUpdated ? teamMemberUpdated : null });
        });
      }
    });
  },
  deleteTeamMember: async (req, res) => {
    // get user id from token
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to remove a team member from an invalid user'
      });

    // check if user from token is admin member of team
    const teamId = req.params.teamId;
    const isUserATeamAdminMember = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound,
      'members.memberType': memberTypes.ADMIN
    }).catch((err) => console.log(err));
    if (!isUserATeamAdminMember)
      return res
        .status(400)
        .json('User not permitted to remove a member of team');

    // remove member from team
    const memberid = req.params.memberId;
    await Team.findById(teamId, (err, team) => {
      if (err) console.log(err);
      else {
        team.members = team.members.filter((f) => f.id !== memberid);
        team.save((err, team) => {
          if (err) console.log(err);
          return res.status(200).json();
        });
      }
    });
  },
  // bucket
  addBucketToTeam: async (req, res) => {
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to add a bucket to team from an invalid user'
      });

    // check user is admin of team
    const teamId = req.params.teamId;
    const isUserATeamAdminMember = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound,
      'members.memberType': memberTypes.ADMIN
    }).catch((err) => console.log(err));
    if (!isUserATeamAdminMember)
      return res.status(400).json('User not permitted to add a bucket to team');

    const bucketId = req.params.bucketId;
    // check if bucket has already been added to team
    const isBucketInTeam = isUserATeamAdminMember.idBuckets.find(
      (f) => f === bucketId
    );
    if (isBucketInTeam)
      return res.status(400).json('Bucket has already been added to team');

    // add bucket id to team
    Team.findByIdAndUpdate(
      teamId,
      {
        $push: { idBuckets: bucketId }
      },
      { upsert: true },
      (err, team) => {
        if (err) return res.status(400).json(err);
        else {
          return res.status(200).json();
        }
      }
    );
  },
  removeBucketToTeam: async (req, res) => {
    const userIdFound = await getUserIdFromToken(req);
    if (!userIdFound)
      return res.status(400).json({
        error: 'Unable to remove a team member from an invalid user'
      });

    // check user is admin of team
    const teamId = req.params.teamId;
    const isUserATeamAdminMember = await Team.findOne({
      _id: teamId,
      'members.id': userIdFound,
      'members.memberType': memberTypes.ADMIN
    }).catch((err) => console.log(err));
    if (!isUserATeamAdminMember)
      return res
        .status(400)
        .json('User not permitted to remove a bucket of team');

    // remove bucket id from team
    const bucketId = req.params.bucketId;
    await Team.findById(teamId, (err, team) => {
      if (err) console.log(err);
      else {
        const indexFound = team.idBuckets.indexOf(bucketId);
        if (indexFound > -1) {
          team.idBuckets.splice(indexFound, 1);
        }

        team.save((err, team) => {
          if (err) console.log(err);
          return res.status(200).json();
        });
      }
    });
  }
};

module.exports = teamController;
