import { DISPLAY_NODE_INFO } from "../actions/actionTypes";
import { HIDE_NODE_INFO } from "../actions/actionTypes";

const initalState = {
  nodeInfoOpen: false,
  currentService: null,
  currentPod: null,
  mouseInfo: { x: 0, y: 0 }
};

export function windowReducer(state = initalState, action) {
  switch (action.type) {
    case DISPLAY_NODE_INFO:
      return {
        ...state,
        nodeInfoOpen: true,
        mouseInfo: action.payload.mouseInfo
      };
    case HIDE_NODE_INFO:
      return {
        ...state,
        nodeInfoOpen: false,
        mouseInfo: {x: 0, y: 0}
      };
    default:
      return state;
  }
}
