import { checkPodStatus } from '../traffic_page/Util.jsx';
import Builder from './Constructors.jsx';

function buildPod(pod, listOfPVs, podIdx) {
  const podNode = new Builder.Pod(
    pod.name,
    podIdx,
    checkPodStatus(pod.status.currentStatus)
  );

  podNode.children = listOfPVs.reduce((list, pv, idx) => {
    if (pod.persistentVolume[pv.claimName]) {
      list.push(new Builder.PV(pv.name, idx));
    }
    return list;
  }, []);

  return podNode;
}

function buildDataSet(service, listOfPods, listOfPVs, nodeName) {
  let key = null;
  if (service.selector) {
    key = JSON.stringify(service.selector);
  }

  const temp = listOfPods.reduce((list, pod, idx) => {
    // console.log(list, pod);
    if (
      key &&
      JSON.stringify(pod.labels) === key &&
      pod.nodeName === nodeName
    ) {
      const podNode = buildPod(pod, listOfPVs, idx);
      list.push(podNode);
    }
    return list;
  }, []);
  return temp;
}

function buildData(
  listOfPods,
  listOfPVs,
  listOfActiveServices,
  listOfServices,
  nodeName
) {
  const kublet = { name: 'kublet/kube-proxy', children: [] };

  kublet.children = listOfActiveServices.reduce((acc, serviceIdx) => {
    return acc.concat(
      buildDataSet(listOfServices[serviceIdx], listOfPods, listOfPVs, nodeName)
    );
  }, []);

  // console.log(kublet);
  return [kublet];
}

export default buildData;
