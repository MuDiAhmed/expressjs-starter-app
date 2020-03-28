const express = require("express");
const app = express();
const routes = require("./routes");
const middlewares = require("./middlewares");
const env = require("./env");
const reactEngine = require("express-react-views");
require("./models");
require("./globals");

env.setAppEnv(app);
app.set("views", __dirname + "/views");
app.engine("html", require("pug").renderFile);
app.set("view engine", "pub");
app.use(middlewares);
app.use(routes);

module.exports = app;
