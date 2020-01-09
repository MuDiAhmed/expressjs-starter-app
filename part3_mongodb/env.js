const config = require("config");

const dbConfig = config.get("DB");
const envObject = {
  db: dbConfig,
  dbConnection: {
    host: config.has("DB_HOST") ? config.get("DB_HOST") : dbConfig.HOST,
    port: config.has("DB_PORT") ? config.get("DB_PORT") : dbConfig.PORT,
    name: config.has("DB_NAME") ? config.get("DB_NAME") : dbConfig.NAME
  }
};
const env = () => {
  return { ...envObject };
};

const setAppEnv = app => {
  app.set("env", envObject.env);
};
module.exports.getEnv = env;
module.exports.setAppEnv = setAppEnv;
