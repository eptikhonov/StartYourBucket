const { User, UserJoiSchema, UserMongooseSchema } = require('./User');
const { Team, TeamJoiSchema, TeamMongooseSchema } = require('./Team');
const { Bucket, BucketJoiSchema, BucketMongooseSchema } = require('./Bucket');

module.exports.User = User;
module.exports.UserJoiSchema = UserJoiSchema;
module.exports.UserMongooseSchema = UserMongooseSchema;

module.exports.Team = Team;
module.exports.TeamJoiSchema = TeamJoiSchema;
module.exports.TeamMongooseSchema = TeamMongooseSchema;

module.exports.Bucket = Bucket;
module.exports.BucketJoiSchema = BucketJoiSchema;
module.exports.BucketMongooseSchema = BucketMongooseSchema;
