const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);
const { ListJoiSchema } = require('./List');
const { bucketTypes, memberTypes } = require('../variables/enums');

const MemberJoiObject = {
  id: Joi.string(),
  unconfirmed: Joi.bool().default(false),
  memberType: Joi.string().valid(memberTypes.ADMIN, memberTypes.NORMAL),
  deactivated: Joi.bool().default(false)
};

const BucketJoiObject = {
  name: Joi.string().min(1).max(20),
  closed: Joi.bool().default(false),
  idTeam: Joi.string().allow('', null).default(''),
  shortLink: Joi.string().allow('', null).default(''),
  bucketType: Joi.string().valid(bucketTypes.LIST, bucketTypes.BOARD),
  lists: Joi.array().items(ListJoiSchema).default([]),
  // comments: Joi.array().items(Joi.object({ })),
  members: Joi.array().items(Joi.object(MemberJoiObject)).default([]),
  settings: Joi.object({
    permissionLevel: Joi.string().allow('', null).default(''),
    backgroundImage: Joi.string().allow('', null).default('')
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
    const { name, bucketType } = BucketJoiObject;
    const schema = Joi.object({
      name: name.required(),
      bucketType: bucketType.required()
    });
    return schema.validate(data);
  },
  updateBucketValidation: (data) => {
    const { bucketType, ...bucketJoiObject } = BucketJoiObject;
    // exclude ability to update bucketType
    const schema = Joi.object(bucketJoiObject);
    return schema.validate(data);
  },
  addBucketMemberValidation: (data) => {
    const { id, unconfirmed, memberType, deactivated } = MemberJoiObject;
    // update single member
    const schema = Joi.object({
      id: id.required(),
      unconfirmed: unconfirmed.required(),
      memberType: memberType.required(),
      deactivated: deactivated.required()
    });
    return schema.validate(data);
  },
  updateBucketMemberValidation: (data) => {
    const { id, ...memberJoiObject } = MemberJoiObject;
    // exclude id from update
    const schema = Joi.object(memberJoiObject);
    return schema.validate(data);
  }
};
module.exports = {
  BucketValidations,
  BucketJoiObject,
  BucketJoiSchema,
  BucketMongooseSchema,
  Bucket
};
