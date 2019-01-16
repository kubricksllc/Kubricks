import Builder from "./Constructors.jsx";

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
        idx
      );
      serviceNode.children.push(podNode);
    }
  });

  return serviceNode;
}