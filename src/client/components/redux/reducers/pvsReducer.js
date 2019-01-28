import {PVS_FETCH} from '../actions/actionTypes.js';

const initialState = {
  listOfPVs: [],
  currentPV: null
}

export function pvsReducer (state = initialState, action) {
  switch(action.type) {
    case PVS_FETCH: {
      return {
      ...state,
      listOfPVs: action.payload
      }      
    }

    default: {
      return state
    }
  }
}