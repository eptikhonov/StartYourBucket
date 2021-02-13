const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const UserJoiObject = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
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
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
  createdDate: Joi.date().default(Date.now()),
  modifiedDate: Joi.date().default(Date.now())
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
