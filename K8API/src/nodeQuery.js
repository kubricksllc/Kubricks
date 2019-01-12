const kube = require('./kubeApi.js');

function parseContainers(containerArr) {
  return containerArr.reduce((listOfContainers, container) => {
    const temp = {};
    temp.containerName = container.name;
    temp.imageName = container.image;
    temp.mappedContainerPort = container.ports.containerPort;
    temp.env = container.env;
    return listOfContainers.concat([temp]);
  }, []);
}

function parseStatus(statusObj) {
  return {
    currentStatus: statusObj.phase,
    podIP: statusObj.podIP,
    initialized: statusObj.conditions.reduce((acc, pod) => {
      acc[pod.type] = pod.status;
      return acc;
    }, {}),
    podStartTime: statusObj.startTime,
    containerStatus: statusObj.containerStatuses.reduce((acc, container) => {
      const temp = {};
      temp.containerName = container.name;
      temp.ready = container.ready;
      temp.restartCount = container.restartCount;
      return acc.concat([temp]);
    }, [])
  };
}

function getNamespace() {
  return kube
    .listNamespace()
    .then(result =>
      result.body.items.filter(element =>
        element.metadata.name.match(/^(?!kube)/)
      )
    );
}

function getServices(namespace) {
  return kube
    .listNamespacedService(
      namespace,
      undefined,
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
      return result.body.items.reduce((listOfServices, service) => {
        const temp = {};
        const { metadata, spec, status } = service;
        temp.name = metadata.name;
        temp.type = spec.type;
        temp.clusterIP = spec.clusterIP;
        temp.createdAt = metadata.creationTimestamp;
        temp.selector = spec.selector;
        temp.ports = spec.ports;
        temp.labels = metadata.labels;
        spec.type === 'LoadBalancer'
          ? (temp.status = status.loadBalancer)
          : (temp.status = null);
        return listOfServices.concat([temp]);
      }, []);
    });
}

function getPods(namespace) {
  return kube
    .listNamespacedPod(
      namespace,
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
      // console.log(result.body.items)
      return result.body.items.reduce((listOfPods, pod) => {
        // console.log(listOfPods)
        const temp = {};
        const { metadata, spec, status } = pod;
        temp.name = metadata.name;
        temp.containers = parseContainers(spec.containers);
        temp.listOfVolumes = spec.volumes.map(volume => volume.name);
        temp.createdAt = metadata.creationTimestamp;
        temp.nodeName = spec.nodeName;
        temp.status = parseStatus(status);
        return listOfPods.concat([temp]);
      }, []);
    });
}

const nodeQuery = {
  getNode: (req, res) => {
    getNamespace()
      .then(listOfNamespaces => {
        return listOfNamespaces.reduce(
          async (responseBody, element) => {
            const { name } = element.metadata;
            const listOfServices = await getServices(name);
            responseBody.services = listOfServices;
            const listOfPods = await getPods(name);
            responseBody.pods = listOfPods;
            return responseBody;
          },
          { services: null, pods: null }
        );
      })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  }
};

module.exports = nodeQuery;
