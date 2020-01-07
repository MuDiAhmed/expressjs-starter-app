const config = require("config");

const envObject = {
  port: config.has("PORT") ? config.get("PORT") : config.get("DEFAULT_PORT"),
  env: config.util.getEnv("NODE_ENV"),
  server_debug: config.get("APP_DEBUG.SERVER"),
  api_debug: config.get("APP_DEBUG.API")
};

const env = () => {
  return { ...envObject };
};
module.exports = env;
