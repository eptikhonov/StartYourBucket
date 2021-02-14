const Joi = require('joi');
const { UserJoiObject, BucketJoiObject, TeamJoiObject } = require('../models');

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
  const { createdDate, ...userObject } = UserJoiObject;
  const schema = Joi.object(userObject);
  return schema.validate(data);
};

const updateTeamValidation = (data) => {
  const { createdDate, ...teamObject } = TeamJoiObject;
  const schema = Joi.object(teamObject);
  return schema.validate(data);
};

const updateBucketValidation = (data) => {
  const { createdDate, ...bucketObject } = BucketJoiObject;
  const schema = Joi.object(bucketObject);
  return schema.validate(data);
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
