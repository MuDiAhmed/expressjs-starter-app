const config = require("config");

const envObject = {
  port: config.has("PORT") ? config.get("PORT") : config.get("DEFAULT_PORT"),
  env: config.util.getEnv("NODE_ENV")
};

const env = () => {
  return { ...envObject };
};
module.exports = env;
