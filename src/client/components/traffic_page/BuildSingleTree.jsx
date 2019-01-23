import Builder from "./Constructors.jsx";
import { checkPodStatus, checkPortMapping } from "./Util.jsx";

const podIdxUsed = [];

export function buildSingleTree(service, listOfPodsInStore, serviceIdx) {
  const serviceNode = new Builder.ServiceNode(
    service.name,
    service.type,
    service.selector,
    service.ports,
    "blue",
    serviceIdx
  );
  let key = null;
  if (service.selector) {
    key = JSON.stringify(service.selector);
  }

  listOfPodsInStore.forEach((pod, idx) => {
    // console.log(pod, service)
    if (key && JSON.stringify(pod.labels) === key) {
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
    "No_Service",
    null,
    null,
    null,
    "red"
  );
  listOfPodsInStore.forEach((pod, idx) => {
    if (!podIdxUsed[idx]) {
      const podNode = new Builder.PodNode(
        pod.name,
        pod.labels,
        pod.containers[0].mappedContainerPort,
        idx,
        "red"
      );
      serviceNode.children.push(podNode);
    }
  });

  return serviceNode;
}
