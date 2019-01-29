const express = require('express');
const path = require('path');
const httpServer = require('http');
// const ws = require('socket.io');
const clusterQuery = require('./clusterQuery.js');
const nodeQuery = require('./nodeQuery.js');
const pvQuery = require('./pvQuery.js');

const app = express();
const server = httpServer.Server(app);

app.use(express.static(path.join(__dirname, "../../main")));
app.use("*", (req, res, next) => {
  console.log("processing request", req.params);
  next();
});

app.get('/api/nodes', clusterQuery.getCluster, (req, res) => res.end());

app.get('/api/renderall', nodeQuery.getServicesAndPods, (req, res) =>
  res.end()
);

app.get('/api/pv/*', pvQuery.getPV, (req, res) => res.end());

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../main/index.html"));
});

server.listen(process.env.PORT || 8080, err => {
  err
    ? console.log(err)
    : console.log('listening at', process.env.PORT || 8080);
});

// TODO: websocket

// const socket = ws.listen(server);
// socket.on('connection', client => {
//   client.on('message', event => {
//     console.log('received message', event);
//   });
//   client.on('disconnect', event => {
//     console.log('server has disconnected', event);
//   });
// });
