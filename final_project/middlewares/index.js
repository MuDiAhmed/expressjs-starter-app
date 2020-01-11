const morgan = require("./morgan");
const morganAccess = morgan.logAll;
const morganError = morgan.logError;
const helmet = require("./helmet");
const express = require("express");
const router = express.Router();
const publicDir = `${__dirname}/../public`;

router.use(morganAccess);
router.use(morganError);
router.use(helmet);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(publicDir));

module.exports = router;
