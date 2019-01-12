const kube = require('./kubeApi.js');

//  to see the node ip of the pods
// kube.listNamespacedPod('default').then(result =>
//   console.log(
//     result.body.items.reduce((acc, val) => {
//       const temp = {};
//       temp.podName = val.metadata.name;
//       temp.podHost = val.status.hostIP;
//       return acc.concat([temp]);
//     }, [])
//   )
// );

//  to see the nodes lookup
// kube.listNode(true).then(result =>
//   console.log(
//     result.body.items.reduce((acc, val) => {
//       const temp = {};
//       const { status } = val;
//       temp.name = val.metadata.name;
//       temp.capacity = status.capacity;
//       temp.conditions = status.conditions;
//       temp.endPoints = status.daemonEndpoints;
//       temp.nodeInfo = status.nodeInfo;
//       return acc.concat([temp]);
//     }, [])
//   )
// );