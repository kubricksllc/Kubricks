import { combineReducers } from 'redux';
import { nodesReducer } from './nodesReducer';
import { windowReducer } from './windowReducer';

const rootReducers = combineReducers({
  nodesReducer,
  windowReducer
});

export default rootReducers;