var spawn = require("child_process").spawn;

const serverProcess = spawn("node", ["src/server/index.js"]);

serverProcess.stderr.on("data", function(data) {
  //throw errors
  console.log("stderr: " + data);
});

serverProcess.stdout.on("data", function(data) {
  console.log("server " + data);
});

serverProcess.on("close", code => {
  console.log(`server close code: ${code}`);
});

module.exports = { serverProcess };
