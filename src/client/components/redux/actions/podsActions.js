import {UPDATE_CURRENT_POD} from './actionTypes.js';

export function updateCurrentPod (podIdx) {
  return {
    type: UPDATE_CURRENT_POD,
    payload: podIdx
  }
}