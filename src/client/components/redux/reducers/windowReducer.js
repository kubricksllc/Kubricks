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
} from '../actions/actionTypes';

const initalState = {
  nodeInfoOpen: false,
  podInfoOpen: false,
  serviceInfoOpen: false,
  pvInfoOpen: false,
  typeContent: '',
  mouseInfo: { x: 0, y: 0 },
  viewMode: 'Cluster'
};

export function windowReducer(state = initalState, action) {
  switch (action.type) {
    case TOGGLE_VIEW_MODE:
      const viewMode = state.viewMode === 'Cluster' ? 'Traffic' : 'Cluster';
      return {
        ...state,
        viewMode
      };
    case DISPLAY_NODE_INFO:
      return {
        ...state,
        nodeInfoOpen: true,
        mouseInfo: action.payload.mouseInfo,
        typeContent: 'node'
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
        mouseInfo: action.payload.mouseInfo,
        typeContent: 'pod'
      };
    case HIDE_POD_INFO:
      return {
        ...state,
        podInfoOpen: false,
        mouseInfo: { x: 0, y: 0 }
      };
    case DISPLAY_SERVICE_INFO:
      return {
        ...state,
        serviceInfoOpen: true,
        mouseInfo: action.payload.mouseInfo,
        typeContent: 'service'
      };
    case HIDE_SERVICE_INFO:
      return {
        ...state,
        serviceInfoOpen: false,
        mouseInfo: { x: 0, y: 0 }
      };
    case DISPLAY_PV_INFO:
      return {
        ...state,
        pvInfoOpen: true,
        typeContent: 'pv'
      };
    case HIDE_PV_INFO:
      return {
        ...state,
        pvInfoOpen: false
      };
    default:
      return state;
  }
}
