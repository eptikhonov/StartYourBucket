const { UserJoiSchema, UserMongooseSchema } = require('../models/User');
const Joi = require('joi');

const registerValidation = (data) => {
  return UserJoiSchema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
