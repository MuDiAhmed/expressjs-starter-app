const http = require("./modules").http;
const log = require("./logger");

const server = http.createServer((req, res) => {
  log("request: " + req.url);
  switch (req.url) {
    case "/api":
      res.write(
        JSON.stringify({
          "/post": {
            method: "GET"
          },
          "/todo": {
            method: "GET"
          }
        })
      );
      res.end();
      return;
    case "/":
    default:
      res.write("hello world");
      res.end();
      return;
  }
});

module.exports = server;
