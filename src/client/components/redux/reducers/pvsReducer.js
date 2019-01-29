import {
  PVS_FETCH,
  DISPLAY_PV_INFO,
  HIDE_PV_INFO
} from '../actions/actionTypes.js';

import moment from 'moment';

const initialState = {
  listOfPVs: [],
  currentPV: null
};

function getAge(datetime) {
  var time = new Date() - new Date(datetime);
  var hours = moment.duration(time).hours();
  var days = moment.duration(time).days();
  return `${days}d${hours}h`;
}

export function pvsReducer(state = initialState, action) {
  switch (action.type) {
    case PVS_FETCH:
      return {
        ...state,
        listOfPVs: action.payload
      };

    case DISPLAY_PV_INFO:
      const currentPV = Object.assign({}, state.listOfPVs[action.payload]);
      currentPV.age = getAge(currentPV.createdAt);
      return {
        ...state,
        currentPV
      };

    case HIDE_PV_INFO:
      return {
        ...state
      };

    default: {
      return state;
    }
  }
}
