import { NODES_FETCH_DATA_SUCCESS } from "../actions/actionTypes";
import { TOGGLE_INFO_WINDOW } from "../actions/actionTypes";

const initalState = {
  listOfNodes: [],
  currentNode: null
};

export function nodesReducer(state = initalState, action) {
  switch (action.type) {
    case NODES_FETCH_DATA_SUCCESS:
      let tmpListofNodes = action.listOfNodes;
      return {
        ...state,
        listOfNodes: tmpListofNodes
      };
    case TOGGLE_INFO_WINDOW:
      const currentNode = state.listOfNodes[action.payload.nodeIndex];
      return {
        ...state,
        currentNode
      };
    default:
      return state;
  }
}
