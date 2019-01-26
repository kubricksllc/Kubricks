import {UPDATE_CURRENT_SERVICE} from './actionTypes.js';

export function updateCurrentService (serviceIndex) {
  return {
    type: UPDATE_CURRENT_SERVICE,
    payload: serviceIndex
  }
}