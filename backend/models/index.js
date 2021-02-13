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

module.exports.User = User;
module.exports.UserJoiObject = UserJoiObject;
module.exports.UserJoiSchema = UserJoiSchema;
module.exports.UserMongooseSchema = UserMongooseSchema;

module.exports.Team = Team;
module.exports.TeamJoiObject = TeamJoiObject;
module.exports.TeamJoiSchema = TeamJoiSchema;
module.exports.TeamMongooseSchema = TeamMongooseSchema;

module.exports.Bucket = Bucket;
module.exports.BucketJoiObject = BucketJoiObject;
module.exports.BucketJoiSchema = BucketJoiSchema;
module.exports.BucketMongooseSchema = BucketMongooseSchema;
