const modules = require("./modules");
const eventEmitter = new modules.EventEmitter();
const log = require("./logger");

eventEmitter.on("message", eventArg => {
  log(eventArg);
});

module.exports = eventEmitter;
