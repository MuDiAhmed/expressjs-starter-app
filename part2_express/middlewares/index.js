const morgan = require("./morgan");
const helmet = require("./helmet");
const express = require("express");
const router = express.Router();
const publicDir = `${__dirname}/../public`;

const middleware = () => {
  router.use(morgan);
  router.use(helmet);
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.static(publicDir));
  return router;
};

module.exports = middleware;
