const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const bucketJoiSchema = Joi.object({
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
});

// convert joi schema to mongoose schema
const bucketMongooseSchema = new Mongoose.Schema(
  Joigoose.convert(bucketJoiSchema)
);

module.exports.BucketJoiSchema = bucketJoiSchema;
module.exports.BucketMongooseSchema = bucketMongooseSchema;
module.exports.Bucket = Mongoose.model('Buckets', bucketMongooseSchema);
