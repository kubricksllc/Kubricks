const kube = require('./kubeApi.js');

function checkReadiness(conditionsArr) {
  const ready = conditionsArr[conditionsArr.length - 1].status;
  return ready ? 'Ready' : 'Not Ready';
}

function parseClusterQuery(nodesArr) {
  const listOfNodes = [];
  nodesArr.forEach(node => {
    const temp = {};
    temp.name = node.metadata.name;
    temp.status = checkReadiness(node.status.conditions);
    temp.createdAt = node.metadata.creationTimestamp;
    temp.version = node.status.nodeInfo.kubeletVersion;
    listOfNodes.push(temp);
  });
  return listOfNodes;
}

const clusterQuery = {
  getCluster: (req, res, next) => {
    console.log('hitting the cluster query')
    kube
      .listNode(
        true,
        undefined,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
      .then(result => {
        console.log('query came back')
        const body = parseClusterQuery(result.body.items);
        return body;
      })
      .then(body => {
        res.set({
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(body));
        next();
      })
      .catch(err => {
        console.log('cluster query error', err);
        res.status(400);
        res.write(JSON.stringify(`failed to query Kubernetes API, possible reasons: 
          unauthorized access, please refresh your token with your cloud provider
          if you are using minikube, please run minikube start`
          ));
        next();
      });
  }
};

module.exports = clusterQuery;
