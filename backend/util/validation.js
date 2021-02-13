const Joi = require('joi');
const { UserJoiObject, BucketJoiObject, TeamJoiObject } = require('../models');

const registerValidation = (data) => {
  return Joi.object(userJoiObject).validate(data);
};

const loginValidation = (data) => {
  const { email, password } = UserJoiObject;
  const schema = Joi.object({
    email,
    password
  });
  return schema.validate(data);
};

const bucketValidation = (data) => {
  const { name } = BucketJoiObject;
  const schema = Joi.object({ name });
  return schema.validate(data);
};

const teamValidation = (data) => {
  const { name } = TeamJoiObject;
  const schema = Joi.object({ name });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.bucketValidation = bucketValidation;
module.exports.teamValidation = teamValidation;
