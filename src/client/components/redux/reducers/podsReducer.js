import {PODS_FETCH} from '../actions/actionTypes.js';

const initialState = {
  listOfPods: [],
  currentPod: null
}

export function podsReducer (state = initialState, action) {
  switch(action.type) {
    case PODS_FETCH: {
      return {
        ...state,
        listOfPods: action.payload
      }
    }
    default: 
      return state;
  }
}