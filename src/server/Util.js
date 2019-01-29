// helper function in pvQuery

function parsePV(listOfVolumes) {
  return listOfVolumes.reduce((list, volume) => {
    if (volume.persistentVolumeClaim) {
      list[volume.persistentVolumeClaim.claimName] = volume.name;
    }
    return list;
  }, {});
}

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
    containerStatus: statusObj.containerStatuses
      ? statusObj.containerStatuses.reduce((acc, container) => {
          const temp = {};
          temp.containerName = container.name;
          temp.ready = container.ready;
          temp.restartCount = container.restartCount;
          return acc.concat([temp]);
        }, [])
      : null
  };
}

//  helper functions in clusterQuery

function checkReadiness(conditionsArr) {
  const ready = conditionsArr[conditionsArr.length - 1].status || null;
  return ready ? 'Ready' : 'Not Ready';
}

module.exports = { parseContainers, parseStatus, checkReadiness, parsePV };
