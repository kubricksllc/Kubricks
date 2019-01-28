const kube = require('./kubeApi.js');

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
      50,
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
      50,
      'true',
      undefined,
      undefined,
      undefined
    ),

  getPV: () =>
    kube.listPersistentVolume('true', null, null, true, null, 50, null),

  getOneNode: (namespace, nodeName) =>
    kube.listNamespacedPod(
      namespace,
      'true',
      undefined,
      `metadata.nodeName=${nodeName}`,
      true,
      undefined,
      50,
      undefined,
      undefined,
      undefined
    )
};

module.exports = api;
