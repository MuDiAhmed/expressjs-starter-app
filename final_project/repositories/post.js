const dbConnectio = require("../db");
const posts = require("../models/post");
const postsModel = posts.Model(dbConnectio);

const createPost = post => {
  const postDoc = new postsModel(post);
  return postDoc.save();
};

const updatePost = (search = null, post = null) => {
  return postsModel.findOneAndUpdate(search, post, {
    useFindAndModify: false,
    new: true
  });
};

const getAll = () => {
  return postsModel.find();
};

const getPostModel = () => {
  return postsModel;
};

module.exports = {
  createPost,
  updatePost,
  getPostModel,
  getAll
};
