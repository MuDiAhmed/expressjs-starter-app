const mongoose = require("mongoose");
const collectionName = "Comment";
const user = require("./user");
const userSchema = user.schema;
const userJoiSchema = user.joiSchema;
const Joi = require("@hapi/joi");

const schema = new mongoose.Schema({
  commenter: { type: userSchema, required: true },
  body: { type: String, required: true, minlength: 10, maxlength: 255 },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const joiSchema = Joi.object({
  commenter: userJoiSchema,
  body: Joi.string()
    .min(10)
    .max(255)
    .required()
});

module.exports.schema = schema;
module.exports.Model = dbConnection =>
  dbConnection.model(collectionName, schema);
module.exports.joiSchema = joiSchema;
