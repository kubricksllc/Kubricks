import { DISPLAY_NODE_INFO } from "./actionTypes";
import { HIDE_NODE_INFO } from "./actionTypes";

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
