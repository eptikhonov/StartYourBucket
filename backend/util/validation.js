const Joi = require('joi');
const { UserJoiSchema, BucketJoiSchema } = require('../models');

const registerValidation = (data) => {
  return UserJoiSchema.validate(data);
};

const loginValidation = (data) => {
  // const schema = UserJoiSchema.fork(['email', 'password'], (field) =>
  //   field.required()
  // );

  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
};

const bucketValidation = (data) => {
  const schema = BucketJoiSchema.fork(['name'], (field) => field.required());
  return schema.validate(data);
};

const teamValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(20).required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.bucketValidation = bucketValidation;
module.exports.teamValidation = teamValidation;
