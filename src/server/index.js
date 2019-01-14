const express = require('express');
const clusterQuery = require('./clusterQuery.js');
const nodeQuery = require('./nodeQuery.js');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../../dist')));
app.use('*', (req, res, next) => {
  console.log('processing request', req.query);
  next();
});

app.get('/api/nodes', clusterQuery.getCluster, (req, res) => {
  res.end();
});

app.get('/api/node', nodeQuery.getNode, (req, res) => {
  res.end();
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(process.env.PORT || 8080, (err) => {
  err ? console.log(err) : console.log('listening at', process.env.PORT || 8080)
});
