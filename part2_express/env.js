const config = require("config");
let env = {
  port: config.has("PORT") ? config.get("PORT") : config.get("DEFAULT_PORT"),
  env: config.util.getEnv("NODE_ENV")
};

module.exports = env;
