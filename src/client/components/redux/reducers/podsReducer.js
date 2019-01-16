import {PODS_FETCH, UPDATE_CURRENT_POD} from '../actions/actionTypes.js';

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
    case UPDATE_CURRENT_POD: {
      return {
        ...state,
        currentPod: action.payload
      }
    }
    default: 
      return state;
  }
}