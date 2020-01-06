const log = require("./logger");
const modules = require("./modules");
const eventEmitter = require("./event");
const server = require("./server");

log(modules.path.parse(__filename));
log(modules.os.totalmem() / 1024 / 1024);
log("error message");
modules.fs.readdir("./", (error, files) => {
  if (error) log(error);
  else log(files);
});
eventEmitter.emit("message", { id: 4, name: "said" });

server.listen(3000);
// console.log(global);
// console.log(module);
