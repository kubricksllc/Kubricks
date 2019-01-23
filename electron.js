const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const fetch = require("node-fetch");
let appWin = null;
let loadingWin = null;
const server = require("./src/server/index");

//Use this module for electron-package
// const { serverProcess } = require("./process/serverProcess");
// const { portForward } = require("./process/portForward");
//Otherwise set serverProcess to null if you're using gulp
// let serverProcess;

function createLoadingWindow() {
  // Initialize the window to our specified dimensions
  loadingWin = new BrowserWindow({
    width: 400,
    height: 400,
    show: true,
    frame: false
  });

  // Specify entry point
  loadingWin.loadURL(
    url.format({
      pathname: path.resolve(
        __dirname,
        "./src/loading.html"
      ) /* Attention here: origin is path.join(__dirname, 'index.html') */,
      protocol: "file",
      slashes: true
    })
  );

  // Remove window once app is closed
  loadingWin.on("closed", function() {
    loadingWin = null;
  });

  const ping = setInterval(() => {
    fetch("http://localhost:8080")
      .then(response => {
        if (response.status === 200) {
          createAppWindow();
          clearInterval(ping);
        }
      })
      .catch(err => {});
  }, 200);
}

function createAppWindow() {
  // Initialize the window to our specified dimensions
  appWin = new BrowserWindow({ width: 1000, height: 600, show: true });

  // Specify entry point
  appWin.loadURL("http://localhost:8080");

  // Show dev tools
  // Remove this line before distributing
  // appWin.webContents.openDevTools();

  // Remove window once app is closed
  appWin.on("closed", function() {
    appWin = null;
  });

  loadingWin.close();
}

app.on("ready", function() {
  createLoadingWindow();
});

app.on("activate", () => {
  if (appWin === null) {
    createLoadingWindow();
  }
});

app.on("window-all-closed", function() {
  if (process.platform != "darwin") {
    app.quit();

    // if (serverProcess) {
    //   // serverProcess.kill("SIGINT");
    // }

    // if (portForward) {
    //   // portForward.kill("SIGINT");
    // }
  }
});
