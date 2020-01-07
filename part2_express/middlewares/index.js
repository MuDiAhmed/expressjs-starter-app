const morgan = require("./morgan");
const helmet = require("./helmet");
const express = require("express");
const logger = require("./logger");
const router = express.Router();
const publicDir = `${__dirname}/../public`;

const middleware = () => {
  router.use(logger.log);
  router.use(morgan);
  router.use(helmet);
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.static(publicDir));
  return router;
};

module.exports = middleware;
