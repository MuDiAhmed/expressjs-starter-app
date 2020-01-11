const dbConnectio = require("../db");
const posts = require("../models/posts");
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

const getPostModel = () => {
  return postsModel;
};

module.exports = {
  createPost,
  updatePost,
  getPostModel
};
