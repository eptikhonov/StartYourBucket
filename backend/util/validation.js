const Joi = require('joi');
const {
  UserJoiObject,
  UserJoiSchema,
  BucketJoiObject,
  BucketJoiSchema,
  TeamJoiObject,
  TeamJoiSchema
} = require('../models');

const registerValidation = (data) => {
  const { firstName, lastName, email, password } = UserJoiObject;
  const schema = Joi.object({
    ...UserJoiObject,
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required()
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const { email, password } = UserJoiObject;
  const schema = Joi.object({
    email: email.required(),
    password: password.required()
  });
  return schema.validate(data);
};

const bucketValidation = (data) => {
  const { name } = BucketJoiObject;
  const schema = Joi.object({ name: name.required() });
  return schema.validate(data);
};

const teamValidation = (data) => {
  const { name } = TeamJoiObject;
  const schema = Joi.object({ name: name.required() });
  return schema.validate(data);
};

const updateUserValidation = (data) => {
  return UserJoiSchema.validate(data);
};

const updateTeamValidation = (data) => {
  return TeamJoiSchema.validate(data);
};

const updateBucketValidation = (data) => {
  return BucketJoiSchema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  bucketValidation,
  teamValidation,
  updateUserValidation,
  updateTeamValidation,
  updateBucketValidation
};
