const express = require("express");
const app = express();
const api = require("./api");
const controllers = require("./controllers");
const middlewares = require("./middlewares");

app.use(middlewares());
app.use(api);
app.use(controllers);

module.exports = app;
