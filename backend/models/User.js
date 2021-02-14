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
const UserMongooseSchema = new Mongoose.Schema(
  Joigoose.convert(UserJoiSchema),
  { timestamps: true }
);

const User = Mongoose.model('Users', UserMongooseSchema);

// schema validations
const UserValidations = {
  registerValidation: (data) => {
    const { firstName, lastName, email, password } = UserJoiObject;
    const schema = Joi.object({
      ...UserJoiObject,
      firstName: firstName.required(),
      lastName: lastName.required(),
      email: email.required(),
      password: password.required()
    });
    return schema.validate(data);
  },
  loginValidation: (data) => {
    const { email, password } = UserJoiObject;
    const schema = Joi.object({
      email: email.required(),
      password: password.required()
    });
    return schema.validate(data);
  },
  updateUserValidation: (data) => {
    return UserJoiSchema.validate(data);
  }
};

module.exports = {
  UserValidations,
  UserJoiObject,
  UserJoiSchema,
  UserMongooseSchema,
  User
};
