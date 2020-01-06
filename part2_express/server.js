const express = require("express");
const app = express();
const logger = require("../part1/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger(`request url: ${req.url}, request method: ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
