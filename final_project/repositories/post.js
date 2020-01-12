const dbConnectio = require("../db");
const posts = require("../models/post");
const postsModel = posts.Model(dbConnectio);
const postsJoiSchema = posts.joiSchema;

const createPost = post => {
  const postDoc = new postsModel(post);
  return postDoc.save();
};

const updatePostById = (id, post = null) => {
  return postsModel.findByIdAndUpdate(id, post, {
    useFindAndModify: false,
    new: true
  });
};

const getAll = () => {
  return postsModel.find();
};

const getOneById = id => {
  return postsModel.findById(id);
};

const getPostModel = () => {
  return postsModel;
};

const validatePost = post => {
  return postsJoiSchema.validate(post);
};

const deletePostById = id => {
  return postsModel.findByIdAndRemove(id, {
    useFindAndModify: false
  });
};

module.exports = {
  createPost,
  updatePostById,
  getPostModel,
  getAll,
  getOneById,
  validatePost,
  deletePostById
};
