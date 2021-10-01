const Joi = require("joi");

const schemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .required(),
  isFavorite: Joi.boolean().optional(),
});

const schemaContactStatus = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const pattern = "\\w{1,9}";

const schemaContactId = Joi.object({
  contactId: Joi.string().pattern(new RegExp(pattern)).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Missing ${err.message.replace(/"/g, "")}!`,
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
