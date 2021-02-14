const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const UserJoiObject = {
  firstName: Joi.string(),
  lastName: Joi.string(),
  bio: Joi.string(),
  avatarUrl: Joi.string(),
  idBuckets: Joi.array().items(Joi.string()),
  idTeams: Joi.array().items(Joi.string()),
  loginTypes: Joi.array().items(Joi.string()),
  settings: Joi.object({
    //notificationInfo: Joi.object({}),
    //timezoneInfo: Joi.object({}),
    colorBlind: Joi.bool().default(false)
  }),
  email: Joi.string().email(),
  password: Joi.string().min(6)
};

const UserJoiSchema = Joi.object(UserJoiObject);

// convert joi schema to mongoose schema
const UserMongooseSchema = new Mongoose.Schema(Joigoose.convert(UserJoiSchema));

const User = Mongoose.model('Users', UserMongooseSchema);

module.exports = {
  UserJoiObject,
  UserJoiSchema,
  UserMongooseSchema,
  User
};
