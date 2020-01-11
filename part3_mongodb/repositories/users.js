const dbConnectio = require("../db");
const users = require("../models/users");
const usersModel = users.Model(dbConnectio);

const createUser = user => {
  const userDoc = new usersModel(user);
  return userDoc.save();
};

const updateUser = (search = null, user = null) => {
  return usersModel.findOneAndUpdate(search, user, {
    useFindAndModify: false,
    new: true
  });
};

const getUserModel = () => {
  return usersModel;
};

module.exports = {
  createUser,
  updateUser,
  getUserModel
};
