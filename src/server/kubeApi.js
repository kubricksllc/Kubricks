//  this is the api from the K8 team
const k8Api = require('@kubernetes/client-node');

//  this is to create an empty config file
const kubeConfig = new k8Api.KubeConfig();

//  this is to load the default config file, whichever your kubectl is connected to
kubeConfig.loadFromDefault();

//  this is to the use the existing config to connect to your cluster
const kube = kubeConfig.makeApiClient(k8Api.Core_v1Api);

module.exports = kube;

// kube.readNamespacedPodLog('client-deployment-5fd8df4688-2t2pz', 'default').then(res => console.log(res)).catch(err => console.log(err))
// kube.listNamespacedPod('default', 'true').then(res => console.log(res.body.items[res.body.items.length-1].spec.volumes));
// kube.listPersistentVolume().then(res => console.log(res.body.items[0].spec))
// kube.listPodForAllNamespaces(null, 'spec.nodeName=gke-kubricks-default-pool-b055752b-7nsz').then(res => console.log(res.body.items))