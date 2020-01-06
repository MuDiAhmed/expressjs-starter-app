const app = require("./server");
const logger = require("../part1/logger");
const env = require("./env");
const api = require("./api");

app.use(api);

app.listen(env.port, () => logger(`listening to port ${env.port}`));
