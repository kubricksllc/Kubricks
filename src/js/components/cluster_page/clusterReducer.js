import { CLUSTER_FETCH_DATA_SUCCESS } from "./clusterActions";

export function listOfNodes(state = [], action) {
  switch(action.type) {
    case(CLUSTER_FETCH_DATA_SUCCESS):
      return action.listOfNodes;
    default:
      return state;
  }
}