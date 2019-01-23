import {
  DISPLAY_NODE_INFO,
  HIDE_NODE_INFO,
  DISPLAY_POD_INFO,
  HIDE_POD_INFO
} from "../actions/actionTypes";

const initalState = {
  nodeInfoOpen: false,
  podInfoOpen: false,
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
        mouseInfo: { x: 0, y: 0 }
      };
    case DISPLAY_POD_INFO:
      return {
        ...state,
        podInfoOpen: true,
        mouseInfo: action.payload.mouseInfo
      };
    case HIDE_POD_INFO:
      return {
        ...state,
        podInfoOpen: false,
        mouseInfo: { x: 0, y: 0 }
      };
    default:
      return state;
  }
}
