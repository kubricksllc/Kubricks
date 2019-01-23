import { DISPLAY_NODE_INFO, HIDE_NODE_INFO } from "./actionTypes";
import { DISPLAY_POD_INFO, HIDE_POD_INFO } from "./actionTypes";

// Action creators
export function displayNodeInfo(nodeIndex, mouseInfo) {
  return {
    type: DISPLAY_NODE_INFO,
    payload: { nodeIndex, mouseInfo }
  };
}

export function hideNodeInfo(nodeIndex, mouseInfo) {
  return {
    type: HIDE_NODE_INFO,
    payload: { nodeIndex, mouseInfo }
  };
}

export function displayPodInfo(podIndex, mouseInfo) {
  return {
    type: DISPLAY_POD_INFO,
    payload: {podIndex, mouseInfo}
  }
}

export function hidePodInfo(podIndex, mouseInfo) {
  return {
    type: HIDE_POD_INFO,
    payload: {
      podIndex, mouseInfo
    }
  }
}