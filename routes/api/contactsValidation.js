const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { HttpCode } = require("../../config/constants");

const schemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s?\d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaContactStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaContactId = Joi.object({
  contactId: Joi.objectId().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}!`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateContactStatus = async (req, res, next) => {
  return await validate(schemaContactStatus, req.body, res, next);
};

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next);
};
