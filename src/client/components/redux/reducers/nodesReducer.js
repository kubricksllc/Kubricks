import {
  NODES_FETCH_DATA_SUCCESS,
  DISPLAY_NODE_INFO,
  HIDE_NODE_INFO
} from "../actions/actionTypes";

import moment from "moment";

const initalState = {
  listOfNodes: [],
  currentNode: "gke-kubricks-default-pool-b055752b-wb5z"
};

function getAge(datetime) {
  var time = new Date() - new Date(datetime);
  var hours = moment.duration(time).hours();
  var days = moment.duration(time).days();
  return `${days}d${hours}h`;
}

export function nodesReducer(state = initalState, action) {
  switch (action.type) {
    case NODES_FETCH_DATA_SUCCESS:
      for (let node of action.listOfNodes) {
        node.age = getAge(node.createdAt);
      }
      let tmpListofNodes = action.listOfNodes;
      return {
        ...state,
        listOfNodes: tmpListofNodes
      };
    case DISPLAY_NODE_INFO:
      return {
        ...state,
        currentNode: state.listOfNodes[action.payload.nodeIndex]
      };
    case HIDE_NODE_INFO:
      return {
        ...state,
        currentNode: null
      };
    default:
      return state;
  }
}
