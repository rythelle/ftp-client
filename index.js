const fs = require("fs");
const path = require("path");
const client = require("ftp");

const numPath = path.resolve("../Num.txt");
const ipCPLPath = path.resolve("../IP.txt");

try {
  var num = fs.readFileSync(numPath, "utf8");
} catch (err) {
  console.log(err);
}

try {
  var ipCLP = fs.readFileSync(ipCPLPath, "utf8");
} catch (err) {
  console.log(err);
}

var newClient = new client();
newClient.on("ready", function () {
  newClient.get("/usr/Log/ListDef.csv", function (err, stream) {
    if (err) throw err;
    stream.once("close", function () {
      newClient.end();
    });
    stream.pipe(fs.createWriteStream("../ftp_def/" + num + ".csv"));
  });
});

config = {
  host: ipCLP,
  port: 21,
  user: "USER",
  password: "USER",
};

newClient.connect(config);
