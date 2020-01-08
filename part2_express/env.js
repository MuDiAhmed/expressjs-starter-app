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

const setAppEnv = app => {
  app.set("env", envObject.env);
};
module.exports.getEnv = env;
module.exports.setAppEnv = setAppEnv;
