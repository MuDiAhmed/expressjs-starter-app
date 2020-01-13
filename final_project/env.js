const config = require("config");

const dbConnection = config.get("DB_CONNECTION");
const env = {
  port: config.has("ENV_PORT") ? config.get("ENV_PORT") : config.get("PORT"),
  env: config.util.getEnv("NODE_ENV"),
  server_debug: config.get("APP_DEBUG.SERVER"),
  api_debug: config.get("APP_DEBUG.API"),
  log: config.get("LOG"),
  dbMongooseConfig: config.get("DB_MONGOOSE_CONFIG"),
  dbConnection: {
    host: config.has("ENV_DB_HOST")
      ? config.get("ENV_DB_HOST")
      : dbConnection.HOST,
    port: config.has("ENV_DB_PORT")
      ? config.get("ENV_DB_PORT")
      : dbConnection.PORT,
    name: config.has("ENV_DB_NAME")
      ? config.get("ENV_DB_NAME")
      : dbConnection.NAME
  },
  models: config.get("MODELS")
};

const getEnv = () => {
  return { ...env };
};

const setAppEnv = app => {
  app.set("env", env.env);
};
module.exports.getEnv = getEnv;
module.exports.setAppEnv = setAppEnv;
