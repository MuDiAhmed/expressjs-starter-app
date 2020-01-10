const mongoose = require("mongoose");
const env = require("./env").getEnv();

mongoose.plugin(require("./plugins/updatedDate"));

const dbConnectio = mongoose.createConnection(
  `mongodb://${env.dbConnection.host}:${env.dbConnection.port}/${env.dbConnection.name}`,
  {
    useNewUrlParser: env.db.NEW_URL_PARSER,
    useUnifiedTopology: env.db.UNIFIED_TOPOLOGY,
    useCreateIndex: env.db.CREATE_INDEX,
    bufferCommands: env.db.BUFFER_COMMANDS,
    autoIndex: env.db.AUTO_INDEX,
    autoCreate: env.db.AUTO_CREATE
  }
);

module.exports = dbConnectio;
