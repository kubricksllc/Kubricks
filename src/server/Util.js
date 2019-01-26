// helper functions in nodeQuery
function parseContainers(containerArr) {
  return containerArr.reduce((listOfContainers, container) => {
    const temp = {};
    temp.containerName = container.name;
    temp.imageName = container.image;
    temp.mappedContainerPort = container.ports;
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

//  helper functions in clusterQuery

function checkReadiness(conditionsArr) {
  const ready = conditionsArr[conditionsArr.length - 1].status;
  return ready ? 'Ready' : 'Not Ready';
}

// helper functions in podQuery

module.exports = { parseContainers, parseStatus, checkReadiness };
