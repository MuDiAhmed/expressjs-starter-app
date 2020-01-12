const mongoose = require("mongoose");
const collectionName = "Post";
const user = require("./user");
const userSchema = user.schema;
const userJoiSchema = user.joiSchema;
const comment = require("./comment");
const commentSchema = comment.schema;
const commentJoiSchema = comment.joiSchema;
const Joi = require("@hapi/joi");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: 10,
    maxlength: 60,
    unique: true //is Not a Validator, It's a convenient helper for building MongoDB unique indexes.
  },
  body: { type: String, required: true, minlength: 10, maxlength: 255 },
  auther: { type: userSchema, required: true },
  isPublished: { type: Boolean, default: false },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  tags: [String],
  comments: [commentSchema],
  meta: {
    votes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 }
  }
});

const joiSchema = Joi.object({
  title: Joi.string()
    .min(10)
    .max(60)
    .required(),
  body: Joi.string()
    .min(10)
    .max(255)
    .required(),
  auther: userJoiSchema,
  isPublished: Joi.boolean().default(false),
  tags: Joi.array().items(Joi.string()),
  comments: commentJoiSchema,
  meta: Joi.object({
    votes: Joi.number().default(0),
    favs: Joi.number().default(0)
  })
});

//adding instance method (have to use function, arrow function won't work)
schema.methods.findAllWithSameAuther = function(callback) {
  return this.model(collectionName).find({ auther: this.auther }, callback);
};

//adding static method
schema.statics.findByAuther = function(auther) {
  return this.find({ auther });
};

module.exports.schema = schema;
module.exports.Model = dbConnection =>
  dbConnection.model(collectionName, schema);

module.exports.joiSchema = joiSchema;