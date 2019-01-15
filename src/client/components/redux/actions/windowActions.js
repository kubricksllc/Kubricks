import { TOGGLE_INFO_WINDOW } from "./actionTypes";

// Action creators
export function toggleInfoWindow(nodeIndex, mouseInfo) {
  return {
    type: TOGGLE_INFO_WINDOW,
    payload: { nodeIndex, mouseInfo }
  };
}
