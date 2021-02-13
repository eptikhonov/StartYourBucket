const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const teamJoiObject = {
  name: Joi.string().min(1).max(20).required(),
  description: Joi.string().max(500),
  avatarUrl: Joi.string(),
  shortLink: Joi.string(),
  idBuckets: Joi.array().items(Joi.string()),
  members: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      unconfirmed: Joi.bool(),
      memberType: Joi.string(),
      deactivated: Joi.bool()
    })
  ),
  settings: Joi.object({
    permissionLevel: Joi.string()
  }),
  createdDate: Joi.date().default(Date.now()),
  modifiedDate: Joi.date().default(Date.now())
};

const teamJoiSchema = Joi.object(teamJoiObject);

// convert joi schema to mongoose schema
const teamMongooseSchema = new Mongoose.Schema(Joigoose.convert(teamJoiSchema));

module.exports.TeamJoiObject = teamJoiObject;
module.exports.TeamJoiSchema = teamJoiSchema;
module.exports.TeamMongooseSchema = teamMongooseSchema;
module.exports.Team = Mongoose.model('Teams', teamMongooseSchema);
