const app = require("./server");
const env = require("./env")();
const debug = require("debug")(env.server_debug);
const reactEngine = require("express-react-views");

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine.createEngine());
app.listen(env.port, () => debug(`listening to port ${env.port}`));
