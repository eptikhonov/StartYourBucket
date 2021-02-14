const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const BucketJoiObject = {
  name: Joi.string().min(1).max(20),
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
  })
};

const BucketJoiSchema = Joi.object(BucketJoiObject);

// convert joi schema to mongoose schema
const BucketMongooseSchema = new Mongoose.Schema(
  Joigoose.convert(BucketJoiSchema),
  { timestamps: true }
);

const Bucket = Mongoose.model('Buckets', BucketMongooseSchema);

// schema validations
const BucketValidations = {
  bucketValidation: (data) => {
    const { name } = BucketJoiObject;
    const schema = Joi.object({ name: name.required() });
    return schema.validate(data);
  },
  updateBucketValidation: (data) => {
    return BucketJoiSchema.validate(data);
  }
};
module.exports = {
  BucketValidations,
  BucketJoiObject,
  BucketJoiSchema,
  BucketMongooseSchema,
  Bucket
};
