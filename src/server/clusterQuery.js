const Constructor = require('./ResponseClasses.js');
const api = require('./apiQuery');

const clusterQuery = {
  getCluster: (req, res, next) => {
    api
      .getListOfNodes()
      .then(result =>
        result.body.items.reduce((body, node) => {
          const temp = new Constructor.ClusterQueryBody(node);
          return body.concat([temp]);
        }, [])
      )
      .then(body => {
        res.set({
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(body));
        next();
      })
      .catch(err => {
        console.log('error with query', err);
        res.status(400);
        res.write(
          JSON.stringify(`failed to query Kubernetes API, possible reasons: 
          unauthorized access, please refresh your token with your cloud provider
          if you are using minikube, please run minikube start`)
        );
        next();
      });
  }
};

module.exports = clusterQuery;
