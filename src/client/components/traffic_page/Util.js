export function checkPodStatus(currentStatus) {
  switch (currentStatus) {
    case 'Running': {
      return 'green';
    }
    case 'Pending': {
      return 'yellow';
    }
    case 'Failed': {
      return 'red';
    }
    case 'Unknown': {
      return 'gray';
    }
    case 'Succeeded': {
      return 'black';
    }
    default: {
      return 'gray';
    }
  }
}

export function checkPortMapping(serviceListeningPort, podContainerPort) {
  if (serviceListeningPort !== podContainerPort) {
    return false;
  }
  return true;
}
