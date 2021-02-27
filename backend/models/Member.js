const Joi = require('joi');
const { memberTypes } = require('../variables/enums');

const MemberJoiObject = {
  id: Joi.string(),
  unconfirmed: Joi.bool().default(false),
  memberType: Joi.string().valid(memberTypes.ADMIN, memberTypes.NORMAL),
  deactivated: Joi.bool().default(false)
};

// schema validations
const MemberValidations = {
  addMemberValidation: (data) => {
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
  updateMemberValidation: (data) => {
    const { id, ...memberJoiObject } = MemberJoiObject;
    // exclude id from update
    const schema = Joi.object(memberJoiObject);
    return schema.validate(data);
  }
};
module.exports = {
  MemberJoiObject,
  MemberValidations
};
