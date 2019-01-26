var exec = require("child_process").exec;

const portForward = exec(
  "kubectl port-forward client-deployment-68d8bc7949-6q9qf 8002:8002"
);

portForward.stderr.on("data", function(data) {
  //throw errors
  console.log("portForward: " + data);
});

portForward.stdout.on("data", function(data) {
  console.log("portForward " + data);
});

portForward.on("close", code => {
  console.log(`portForward close code: ${code}`);
});

module.exports = { portForward };

setTimeout(() => {
  const curl = exec("curl http://localhost:8002");
  curl.stdout.on("data", function(data) {
    console.log("curl " + data);
  });
}, 1000);
