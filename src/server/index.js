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

app.get('/api', (req, res, next) => {
  const reqQueryType = Object.keys(req.query);
  console.log(reqQueryType);
  if (reqQueryType.length === 0) {
    clusterQuery.getCluster(req, res, next);
  } else if (reqQueryType[0] === 'node') {
    nodeQuery.getNode(req, res, next);
  } 
  // else if (reqQueryType[0] === 'pod') {
  //   podQuery.getPod(req, res, next);} 
  else {
    res.status(404);
    res.statusMessage = 'invalid query';
    res.end();
  }
});

app.get('/api/nodes', (req, res, next) => {
  clusterQuery.getCluster(req, res, next);
});

app.get('/api/node', (req, res, next) => {
  nodeQuery.getNode(req, res, next);
});

app.use((req, res) => {
  console.log('hitting the invalid path');
  res.status(404);
  res.statusMessage = 'Invalid Request';
  res.end();
});

app.listen(process.env.PORT || 8080, (err) => {
  err ? console.log(err) : console.log('listening at', process.env.PORT || 8080)
});
