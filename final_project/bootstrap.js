const express = require("express");
const app = express();
const routes = require("./routes");
const middlewares = require("./middlewares");
const env = require("./env");
const envObjct = env.getEnv();
require("./models");
require("./globals");

env.setAppEnv(app);
app.set("views", [
  `${__dirname}/${envObjct.view.DIR}`,
  `${__dirname}/${envObjct.view.DOCS}`
]);
app.engine("html", require(envObjct.view.ENGINE).__express);
app.set("view engine", envObjct.view.ENGINE);
app.use(middlewares);
app.use(routes);

module.exports = app;
