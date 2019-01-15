import { combineReducers } from 'redux';
import { nodesReducer } from './client/components/redux/reducers/clusterReducer';

const rootReducers = combineReducers({
  nodesReducer
});

export default rootReducers;