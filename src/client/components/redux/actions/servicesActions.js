import {UPDATE_CURRENT_SERVICE} from './actionTypes.js';

export function updateCurrentService (serviceIdx) {
  return {
    type: UPDATE_CURRENT_SERVICE,
    payload: serviceIdx
  }
}