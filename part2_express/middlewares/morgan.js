const rfs = require("rotating-file-stream");
const path = require("path");
const morgan = require("morgan");
const logPath = path.join(__dirname, "../log");
const accessLog = "access.log";

const pad = num => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
  if (!time) return accessLog;

  var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  var hour = pad(time.getHours());
  var minute = pad(time.getMinutes());

  return `${month}/${month}${day}-${hour}${minute}-${index}-${accessLog}`;
};

const accessLogStream = rfs.createStream(generator, {
  interval: "1d", // rotate daily
  size: "10M", // rotate every 10 MegaBytes written
  compress: "gzip", // compress rotated files
  path: logPath
});

module.exports = morgan("combined", { stream: accessLogStream });
