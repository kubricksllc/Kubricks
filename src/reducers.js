import { combineReducers } from 'redux';
import { listOfNodes } from './js/components/cluster_page/clusterReducer';

const rootReducers = combineReducers({
  listOfNodes
});

export default rootReducers;