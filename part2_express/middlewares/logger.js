const env = require("../env")();
const debug = require("debug")(env.api_debug);
module.exports.log = (req, res, next) => {
  debug(`${req.url} ${req.method}`);
  next();
};
