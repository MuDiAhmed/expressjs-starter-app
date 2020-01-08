const app = require("./server");
const env = require("./env").getEnv();
const debug = require("debug")(env.server_debug);

app.listen(env.port, () => debug(`listening to port ${env.port}`));
