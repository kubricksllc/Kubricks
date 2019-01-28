//  this is the api from the K8 team
const k8Api = require('@kubernetes/client-node');

//  this is to create an empty config file
const kubeConfig = new k8Api.KubeConfig();

//  this is to load the default config file, whichever your kubectl is connected to
kubeConfig.loadFromDefault();

//  this is to the use the existing config to connect to your cluster
const kube = kubeConfig.makeApiClient(k8Api.Core_v1Api);

module.exports = { kube };
