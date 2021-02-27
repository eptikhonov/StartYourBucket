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
const {
  ListValidations,
  List,
  ListJoiObject,
  ListJoiSchema,
  ListMongooseSchema
} = require('./List');
const {
  ListItemValidations,
  ListItem,
  ListItemJoiObject,
  ListItemJoiSchema,
  ListItemMongooseSchema
} = require('./ListItem');
const { MemberJoiObject, MemberValidations } = require('./Member');

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
  BucketMongooseSchema,

  ...ListValidations,
  List,
  ListJoiObject,
  ListJoiSchema,
  ListMongooseSchema,

  ...ListItemValidations,
  ListItem,
  ListItemJoiObject,
  ListItemJoiSchema,
  ListItemMongooseSchema,

  ...MemberValidations,
  MemberJoiObject
};
