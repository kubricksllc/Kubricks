import {
  DISPLAY_NODE_INFO,
  HIDE_NODE_INFO,
  DISPLAY_POD_INFO,
  HIDE_POD_INFO,
  DISPLAY_SERVICE_INFO,
  HIDE_SERVICE_INFO,
  DISPLAY_PV_INFO,
  HIDE_PV_INFO,
  TOGGLE_VIEW_MODE
} from './actionTypes';

// Action creators
export function toggleViewMode() {
  return {
    type: TOGGLE_VIEW_MODE
  };
}
export function displayNodeInfo(nodeIndex) {
  return {
    type: DISPLAY_NODE_INFO,
    payload: {
      nodeIndex
    }
  };
}

export function hideNodeInfo(nodeIndex) {
  return {
    type: HIDE_NODE_INFO,
    payload: {
      nodeIndex
    }
  };
}

export function displayPodInfo(podIndex) {
  return {
    type: DISPLAY_POD_INFO,
    payload: {
      podIndex
    }
  };
}

export function hidePodInfo(podIndex) {
  return {
    type: HIDE_POD_INFO,
    payload: {
      podIndex
    }
  };
}

export function displayServiceInfo(serviceIndex) {
  return {
    type: DISPLAY_SERVICE_INFO,
    payload: {
      serviceIndex
    }
  };
}

export function hideServiceInfo(serviceIndex, mouseInfo) {
  return {
    type: HIDE_SERVICE_INFO,
    payload: {
      serviceIndex
    }
  };
}

export function displayPVInfo(pvIndex) {
  return {
    type: DISPLAY_PV_INFO,
    payload: pvIndex
  };
}

export function hidePVInfo(pvIndex) {
  return {
    type: HIDE_PV_INFO,
    payload: pvIndex
  };
}
