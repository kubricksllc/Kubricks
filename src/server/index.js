const express = require('express');
const clusterQuery = require('./clusterQuery.js');
const nodeQuery = require('./nodeQuery.js');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../../dist')));
app.use('*', (req, res, next) => {
  console.log('hitting server', req.query);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../../dist/index.html');
});

app.get('/api/nodes', clusterQuery.getCluster, (req, res) => {
  res.end();
});

app.get('/api/node', nodeQuery.getNode, (req, res) => {
  res.end();
});

app.get('*', (req, res) => {
  console.log('hitting the invalid path');
  res.status(404);
  res.send(JSON.stringify('Invalid Request'));
});

app.listen(process.env.PORT || 8080, (err) => {
  err ? console.log(err) : console.log('listening at', process.env.PORT || 8080)
});
