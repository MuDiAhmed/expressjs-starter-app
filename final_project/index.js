const db = require("./db");
const app = require("./server");
const env = require("./env").getEnv();
const debug = require("debug")(env.server_debug);

db.on("error", console.log.bind(console, "connection error: "));
db.once("connected", () => {
  console.log("connected successfully");
});
db.once("disconnected", () => {
  console.log("disconnected");
});
app.listen(env.port, () => debug(`listening to port ${env.port}`));
