import { CLUSTER_FETCH_DATA_SUCCESS } from "../actions/actionTypes";

const initalState = {
  listOfNodes: []
}

export function nodesReducer(state = initalState, action) {
  switch(action.type) {
    case(CLUSTER_FETCH_DATA_SUCCESS):
      let tmpListofNodes = action.listOfNodes;
      return {
        ...state,
        listOfNodes: tmpListofNodes
      };
    default:
      return state;
  }
}