const express = require("express");
const app = express();
const api = require("./api");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const env = require("./env");
const reactEngine = require("express-react-views");

env.setAppEnv(app);
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine.createEngine());
app.use(middlewares());
app.use(api);
app.use(controllers);

module.exports = app;
