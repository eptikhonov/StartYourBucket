const {
  User,
  UserJoiObject,
  UserJoiSchema,
  UserMongooseSchema
} = require('./User');
const {
  Team,
  TeamJoiObject,
  TeamJoiSchema,
  TeamMongooseSchema
} = require('./Team');
const {
  Bucket,
  BucketJoiObject,
  BucketJoiSchema,
  BucketMongooseSchema
} = require('./Bucket');

module.exports = {
  User,
  UserJoiObject,
  UserJoiSchema,
  UserMongooseSchema,

  Team,
  TeamJoiObject,
  TeamJoiSchema,
  TeamMongooseSchema,

  Bucket,
  BucketJoiObject,
  BucketJoiSchema,
  BucketMongooseSchema
};
