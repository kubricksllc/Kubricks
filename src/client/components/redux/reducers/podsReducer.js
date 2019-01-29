import {
  PODS_FETCH,
  DISPLAY_POD_INFO,
  HIDE_POD_INFO,
  UPDATE_CURRENT_POD
} from '../actions/actionTypes.js';

import moment from 'moment';

const initialState = {
  listOfPods: [],
  currentPod: null
};

function getAge(datetime) {
  var time = new Date() - new Date(datetime);
  var hours = moment.duration(time).hours();
  var days = moment.duration(time).days();
  return `${days}d${hours}h`;
}

export function podsReducer(state = initialState, action) {
  switch (action.type) {
    case PODS_FETCH: {
      return {
        ...state,
        listOfPods: action.payload
      };
    }
    case DISPLAY_POD_INFO:
      const currentPod = Object.assign(
        {},
        state.listOfPods[action.payload.podIndex]
      );
      currentPod.age = getAge(currentPod.createdAt);
      return {
        ...state,
        currentPod
      };
    case HIDE_POD_INFO:
      return {
        ...state
      };
    case UPDATE_CURRENT_POD: {
      return {
        ...state,
        currentPod: action.payload
      };
    }
    default:
      return state;
  }
}
