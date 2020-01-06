const express = require("express");
const app = express();
const api = require("./api");
const morgan = require("morgan");
const helmet = require("helmet");
const rfs = require("rotating-file-stream");
const path = require("path");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log")
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(api);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
