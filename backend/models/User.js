const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const userJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
  createdDate: Joi.date().default(Date.now()),
  modifiedDate: Joi.date().default(Date.now())
});

// convert joi schema to mongoose schema
const userMongooseSchema = new Mongoose.Schema(Joigoose.convert(userJoiSchema));

module.exports.UserJoiSchema = userJoiSchema;
module.exports.UserMongooseSchema = userMongooseSchema;
module.exports.User = Mongoose.model('Users', userMongooseSchema);
