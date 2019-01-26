import { combineReducers } from 'redux';
import { nodesReducer } from './nodesReducer';
import { windowReducer } from './windowReducer';
import { servicesReducer } from './servicesReducer.js';
import { podsReducer } from './podsReducer.js';
import { pvsReducer } from './pvsReducer.js';

const rootReducers = combineReducers({
  nodesReducer,
  windowReducer,
  servicesReducer,
  podsReducer,
  pvsReducer
});

export default rootReducers;