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
  getCluster: (req, res) => {
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
        res.set({
          'Content-Type': 'application/json'
        });
        return body;
      })
      .then(body => {
        res.send(JSON.stringify(body));
      })
      .catch(err => {
        console.log(err);
        res.send(
          'unauthorized access, please refresh your token with your cloud provider'
        );
      });
  }
};

module.exports = clusterQuery;
