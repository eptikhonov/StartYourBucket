const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);
const { ListItemJoiSchema } = require('./ListItem');

const ListJoiObject = {
  title: Joi.string(),
  description: Joi.string(),
  itemsList: Joi.array().items(ListItemJoiSchema),
  idBucket: Joi.string()
};

const ListJoiSchema = Joi.object(ListJoiObject);

// convert joi schema to mongoose schema
const ListMongooseSchema = new Mongoose.Schema(
  Joigoose.convert(ListJoiSchema),
  { timestamps: true }
);

const List = Mongoose.model('Lists', ListMongooseSchema);

// schema validations
const ListValidations = {
  listValidation: (data) => {
    const { title, idBucket } = ListJoiObject;
    const schema = Joi.object({
      title: title.required(),
      idBucket: idBucket.required()
    });
    return schema.validate(data);
  },
  updateListValidation: (data) => {
    const { idBucket, ...listJoiObject } = ListJoiObject;
    // exclude ability to update idBucket
    const schema = Joi.object(listJoiObject);
    return schema.validate(data);
  }
};
module.exports = {
  ListValidations,
  ListJoiObject,
  ListJoiSchema,
  ListMongooseSchema,
  List
};
