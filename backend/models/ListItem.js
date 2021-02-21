const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const ListItemJoiObject = {
  title: Joi.string(),
  description: Joi.string().allow('', null).default(''),
  startDate: Joi.date().allow(null).default(null),
  endDate: Joi.date().allow(null).default(null),
  location: Joi.string().allow('', null).default(''),
  members: Joi.array().items(Joi.string()),
  completed: Joi.bool().default(false),
  idBucketList: Joi.string()
};

const ListItemJoiSchema = Joi.object(ListItemJoiObject);

// convert joi schema to mongoose schema
const ListItemMongooseSchema = new Mongoose.Schema(
  Joigoose.convert(ListItemJoiSchema),
  { timestamps: true }
);

const ListItem = Mongoose.model('ListItems', ListItemMongooseSchema);

// schema validations
const ListItemValidations = {
  listItemValidation: (data) => {
    const { title, idBucketList } = ListItemJoiObject;
    const schema = Joi.object({
      title: title.required(),
      idBucketList: idBucketList.required()
    });
    return schema.validate(data);
  },
  updateListItemValidation: (data) => {
    const { idBucketList, ...listItemJoiObject } = ListItemJoiObject;
    // exclude ability to update idBucketList
    const schema = Joi.object(listItemJoiObject);
    return schema.validate(data);
  }
};
module.exports = {
  ListItemValidations,
  ListItemJoiObject,
  ListItemJoiSchema,
  ListItemMongooseSchema,
  ListItem
};
