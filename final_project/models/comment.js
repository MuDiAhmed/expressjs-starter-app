const mongoose = require("mongoose");
const collectionName = "Comment";
const userSchema = require("./user").schema;

const schema = new mongoose.Schema({
  commenter: { type: userSchema, required: true },
  body: { type: String, required: true, minlength: 10, maxlength: 255 },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

module.exports.schema = schema;
module.exports.Model = dbConnection =>
  dbConnection.model(collectionName, schema);
