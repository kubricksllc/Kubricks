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

export function displayPodInfo(podIdx, mouseInfo) {
  return {
    type: DISPLAY_POD_INFO,
    paylod: {podIdx, mouseInfo}
  }
}

export function hidePodInfo(podIdx, mouseInfo) {
  return {
    type: HIDE_POD_INFO,
    payload: {
      podIdx, mouseInfo
    }
  }
}