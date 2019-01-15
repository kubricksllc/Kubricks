import { NODES_FETCH_DATA_SUCCESS, DISPLAY_NODE_INFO, HIDE_NODE_INFO } from "../actions/actionTypes";

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
    case DISPLAY_NODE_INFO:
      return {
        ...state,
        currentNode : state.listOfNodes[action.payload.nodeIndex]
      };
    case HIDE_NODE_INFO:
      return {
        ...state,
        currentNode : null
      };
    default:
      return state;
  }
}
