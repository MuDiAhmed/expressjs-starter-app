const mongoose = require("mongoose");
const env = require("./env").getEnv();

mongoose.plugin(require("./plugins/updatedDate"));

const dbConnection = mongoose.createConnection(
  `mongodb://${env.dbConnection.host}:${env.dbConnection.port}/${env.dbConnection.name}`,
  {
    useNewUrlParser: env.dbMongooseConfig.NEW_URL_PARSER,
    useUnifiedTopology: env.dbMongooseConfig.UNIFIED_TOPOLOGY,
    useCreateIndex: env.dbMongooseConfig.CREATE_INDEX,
    bufferCommands: env.dbMongooseConfig.BUFFER_COMMANDS,
    autoIndex: env.dbMongooseConfig.AUTO_INDEX,
    autoCreate: env.dbMongooseConfig.AUTO_CREATE
  }
);

module.exports = dbConnection;
