const dbConnection = require("../db");
const { Model, joiSchema } = require("../models/comment");
const commentsModel = Model(dbConnection);
const userRepo = require("./user");

const getAll = () => {
  return commentsModel.find();
};

const create = async comment => {
  const user = await userRepo.getById(comment.commenter);
  const { error } = validate(comment);
  if (error) throw new APIError(400, error);
  return new commentsModel(comment).save();
};

const update = async (id, comment) => {
  if (comment.commenter) {
    const user = await userRepo.getById(comment.commenter);
  }
  const { error } = validate(comment);
  if (error) throw new APIError(400, error);
  return commentsModel.findByIdAndUpdate(id, comment, {
    new: true,
    useFindAndModify: false
  });
};

const deleteComment = async id => {
  const deletedComment = await commentsModel.findByIdAndDelete(id, {
    useFindAndModify: false
  });
  if (!deletedComment) throw new APIError(404, "Invalid Comment ID");
  return deletedComment;
};

const get = async id => {
  const foundComment = await commentsModel.findById(id);
  if (!foundComment) throw new APIError(404, "Invalid Comment ID");
  return foundComment;
};

const validate = comment => {
  return joiSchema.validate(comment);
};

module.exports = {
  getAll,
  create,
  update,
  delete: deleteComment,
  get
};
