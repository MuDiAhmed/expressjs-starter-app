let envObject = {
  port: process.env.PORT || 3000
};

const env = app => {
  if (envObject.env) return envObject;
  envObject.env = app.get("env");
  return envObject;
};
module.exports = env;
