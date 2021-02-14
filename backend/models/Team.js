const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const TeamJoiObject = {
  name: Joi.string().min(1).max(20),
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

const TeamJoiSchema = Joi.object(TeamJoiObject);

// convert joi schema to mongoose schema
const TeamMongooseSchema = new Mongoose.Schema(Joigoose.convert(TeamJoiSchema));

const Team = Mongoose.model('Teams', TeamMongooseSchema);

module.exports = {
  TeamJoiObject,
  TeamJoiSchema,
  TeamMongooseSchema,
  Team
};
