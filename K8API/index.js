const express = require('express');
const clusterQuery = require('./src/clusterQuery.js');
const nodeQuery = require('./src/nodeQuery.js');
const podQuery = require('./src/podQuery.js');

const app = express();

app.use('*', (req, res, next) => {
  console.log('hitting server', req.query);
  next();
});

app.get('/api', (req, res, next) => {
  const reqQueryType = Object.keys(req.query)[0];
  console.log(reqQueryType);
  if (reqQueryType.length === 0) {
    clusterQuery.getCluster(req, res, next);
  } else if (reqQueryType === 'node') {
    nodeQuery.getNode(req, res, next);
  } else if (reqQueryType === 'pod') {
    podQuery.getPod(req, res, next);
  } else {
    res.status(404);
    res.statusMessage = 'invalid query';
    res.end();
  }
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
