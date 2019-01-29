const { kube } = require('./kubeApi.js');

const api = {
  getListOfNodes: () =>
    kube.listNode(
      true,
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),

  getAllPods: () =>
    kube.listPodForAllNamespaces(
      undefined,
      'metadata.namespace!=kube-system', // field selector does not support regex
      true,
      undefined,
      500,
      'true',
      undefined,
      undefined,
      undefined
    ),

  getAllServices: () =>
    kube.listServiceForAllNamespaces(
      undefined,
      'metadata.namespace!=kube-system', // field selector does not support regex
      true,
      undefined,
      500,
      'true',
      undefined,
      undefined,
      undefined
    ),

  getPV: () =>
    kube.listPersistentVolume('true', null, null, true, null, 50, null)
};

module.exports = api;

//api.getAllServices().then(res => console.log(res.body.items))
