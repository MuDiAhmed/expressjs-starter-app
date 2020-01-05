function log(message) {
  console.group("logger");
  console.log("received message is");
  console.log(message);
  console.groupEnd();
}

module.exports = log;
