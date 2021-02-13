const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const BucketJoiObject = {
  name: Joi.string().min(1).max(20).required(),
  closed: Joi.bool().default(false),
  idTeam: Joi.string(),
  shortLink: Joi.string(),
  // comments: Joi.array().items(Joi.object({ })),
  members: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      unconfirmed: Joi.bool(),
      memberType: Joi.string(),
      deactivated: Joi.bool()
    })
  ),
  settings: Joi.object({
    permissionLevel: Joi.string(),
    backgroundImage: Joi.string()
  }),
  createdDate: Joi.date().default(Date.now()),
  modifiedDate: Joi.date().default(Date.now())
};

const BucketJoiSchema = Joi.object(BucketJoiObject);

// convert joi schema to mongoose schema
const BucketMongooseSchema = new Mongoose.Schema(
  Joigoose.convert(BucketJoiSchema)
);

const Bucket = Mongoose.model('Buckets', BucketMongooseSchema);

module.exports = {
  BucketJoiObject,
  BucketJoiSchema,
  BucketMongooseSchema,
  Bucket
};
