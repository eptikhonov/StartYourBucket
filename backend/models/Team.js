const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);
const { MemberJoiObject } = require('./Member');

const TeamJoiObject = {
  name: Joi.string().min(1).max(20),
  description: Joi.string().max(500).allow('', null).default(''),
  avatarUrl: Joi.string().allow('', null).default(''),
  shortLink: Joi.string().allow('', null).default(''),
  idBuckets: Joi.array().items(Joi.string()),
  members: Joi.array().items(Joi.object(MemberJoiObject)).default([]),
  settings: Joi.object({
    permissionLevel: Joi.string().allow('', null).default(''),
    backgroundImage: Joi.string().allow('', null).default('')
  })
};

const TeamJoiSchema = Joi.object(TeamJoiObject);

// convert joi schema to mongoose schema
const TeamMongooseSchema = new Mongoose.Schema(
  Joigoose.convert(TeamJoiSchema),
  { timestamps: true }
);

const Team = Mongoose.model('Teams', TeamMongooseSchema);

// schema validations
const TeamValidations = {
  teamValidation: (data) => {
    const { name } = TeamJoiObject;
    const schema = Joi.object({ name: name.required() });
    return schema.validate(data);
  },
  updateTeamValidation: (data) => {
    return TeamJoiSchema.validate(data);
  }
};

module.exports = {
  TeamValidations,
  TeamJoiObject,
  TeamJoiSchema,
  TeamMongooseSchema,
  Team
};
