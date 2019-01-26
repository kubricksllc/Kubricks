import {
  DISPLAY_NODE_INFO,
  HIDE_NODE_INFO,
  DISPLAY_POD_INFO,
  HIDE_POD_INFO,
  DISPLAY_SERVICE_INFO,
  HIDE_SERVICE_INFO,
  TOGGLE_VIEW_MODE
} from "./actionTypes";

// Action creators
export function toggleViewMode() {
  return {
    type: TOGGLE_VIEW_MODE
  };
}
export function displayNodeInfo(nodeIndex, mouseInfo, contentInfo) {
  return {
    type: DISPLAY_NODE_INFO,
    payload: { 
      nodeIndex, 
      mouseInfo, 
      contentInfo }
  };
}

export function hideNodeInfo(nodeIndex, mouseInfo) {
  return {
    type: HIDE_NODE_INFO,
    payload: { 
      nodeIndex, 
      mouseInfo }
  };
}

export function displayPodInfo(podIndex, mouseInfo, contentInfo) {
  return {
    type: DISPLAY_POD_INFO,
    payload: { 
      podIndex, 
      mouseInfo, 
      contentInfo }
  };
}

export function hidePodInfo(podIndex, mouseInfo) {
  return {
    type: HIDE_POD_INFO,
    payload: {
      podIndex,
      mouseInfo
    }
  };
}

export function displayServiceInfo(serviceIndex, mouseInfo, contentInfo) {
  return {
    type: DISPLAY_SERVICE_INFO,
    payload: { 
      serviceIndex, 
      mouseInfo, 
      contentInfo }
  };
}

export function hideServiceInfo(serviceIndex, mouseInfo) {
  return {
    type: HIDE_SERVICE_INFO,
    payload: {
      serviceIndex,
      mouseInfo
    }
  };
}
