const express = require("express");
const app = express();
const api = require("./api");
const middlewares = require("./middlewares");
const env = require("./env")(app);

app.use(middlewares());

app.use(api);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
