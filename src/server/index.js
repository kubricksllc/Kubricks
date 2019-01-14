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

app.get('/api/nodes', (req, res, next) => {
  return clusterQuery.getCluster(req, res, next);
});

app.get('/api/node', (req, res, next) => {
  return nodeQuery.getNode(req, res, next);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.get('*', (req, res) => {
  console.log('Invalid request', req.url)
  res.status(404);
  res.send(JSON.stringify('Invalid request'))
})

app.listen(process.env.PORT || 8080, (err) => {
  err ? console.log(err) : console.log('listening at', process.env.PORT || 8080)
});
