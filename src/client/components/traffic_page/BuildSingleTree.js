import Builder from './PodNodeSvcNodeClass.js';
import { checkPodStatus, checkPortMapping } from './Util.js';

const podIdxUsed = {};

export function buildSingleTree(service, listOfPodsInStore, serviceIdx) {
  const serviceNode = new Builder.ServiceNode(
    service.name,
    service.type,
    service.selector,
    service.ports,
    'blue',
    serviceIdx
  );
  let key = null;
  if (service.selector) {
    key = JSON.stringify(service.selector);
  }

  listOfPodsInStore.forEach((pod, idx) => {
    if (key && JSON.stringify(pod.labels).includes(key)) {
      const podNode = new Builder.PodNode(
        pod.name,
        pod.labels,
        pod.containers[0].mappedContainerPort,
        idx,
        checkPodStatus(pod.status.currentStatus)
      );
      podIdxUsed[idx] = 1;
      serviceNode.children.push(podNode);
    }
  });

  return serviceNode;
}

export function buildNoServiceTree(listOfPodsInStore) {
  // console.log(service);
  const serviceNode = new Builder.ServiceNode(
    'No_Service',
    null,
    null,
    null,
    'grey'
  );
  listOfPodsInStore.forEach((pod, idx) => {
    if (!podIdxUsed[idx]) {
      const podNode = new Builder.PodNode(
        pod.name,
        pod.labels,
        pod.containers[0].mappedContainerPort,
        idx,
        'red'
      );
      serviceNode.children.push(podNode);
    }
  });

  return serviceNode;
}
