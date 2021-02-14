const {
  UserValidations,
  User,
  UserJoiObject,
  UserJoiSchema,
  UserMongooseSchema
} = require('./User');
const {
  TeamValidations,
  Team,
  TeamJoiObject,
  TeamJoiSchema,
  TeamMongooseSchema
} = require('./Team');
const {
  BucketValidations,
  Bucket,
  BucketJoiObject,
  BucketJoiSchema,
  BucketMongooseSchema
} = require('./Bucket');

module.exports = {
  ...UserValidations,
  User,
  UserJoiObject,
  UserJoiSchema,
  UserMongooseSchema,

  ...TeamValidations,
  Team,
  TeamJoiObject,
  TeamJoiSchema,
  TeamMongooseSchema,

  ...BucketValidations,
  Bucket,
  BucketJoiObject,
  BucketJoiSchema,
  BucketMongooseSchema
};
