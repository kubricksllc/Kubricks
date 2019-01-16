import { TOGGLE_INFO_WINDOW } from "../actions/actionTypes";

const initalState = {
  infoWindowOpen: false,
  currentService: null,
  currentPod: null,
  mouseInfo: { x: 0, y: 0 }
};

export function windowReducer(state = initalState, action) {
  switch (action.type) {
    case TOGGLE_INFO_WINDOW:
      const infoWindowOpen = state.infoWindowOpen ? false : true;
      const mouseInfo = action.payload.mouseInfo;
      return { ...state, infoWindowOpen, mouseInfo };
    default:
      return state;
  }
}
