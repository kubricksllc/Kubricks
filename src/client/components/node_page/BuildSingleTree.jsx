import Builder from './Constructors.jsx';
import { checkPodStatus, checkPortMapping } from './Util.jsx';

const podIdxUsed = [];

export function buildSingleTree(service, listOfPodsInStore, nodeName) {
  // console.log(service);
  const serviceNode = new Builder.ServiceNode(
    service.name,
    service.type,
    service.selector,
    service.ports
  );

  let key = null;
  if (service.selector) {
    key = Object.keys(service.selector)[0];
  }

  listOfPodsInStore.forEach((pod, idx) => {
    if (
      key &&
      pod.labels[key] === service.selector[key] &&
      pod.nodeName === nodeName
    ) {
      const podNode = new Builder.PodNode(
        pod.name,
        pod.labels,
        pod.containers[0].mappedContainerPort,
        idx,
        checkPodStatus(pod.status.currentStatus)
      );
      podIdxUsed.push(idx);
      serviceNode.children.push(podNode);
    }
  });

  return serviceNode;
}

export function buildNoServiceTree(listOfPodsInStore, nodeName) {
  // console.log(service);
  const serviceNode = new Builder.ServiceNode('No_Service', null, null, null, 'red');

  listOfPodsInStore.forEach((pod, idx) => {
    if (pod.nodeName === nodeName && podIdxUsed.indexOf(idx) === -1) {
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