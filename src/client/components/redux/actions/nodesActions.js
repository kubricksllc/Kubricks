import { NODES_FETCH_DATA_SUCCESS, UPDATE_CURRENT_NODE } from "./actionTypes";

// Action creators
export function nodesFetchDataSuccess(listOfNodes) {
  return {
    type: NODES_FETCH_DATA_SUCCESS,
    listOfNodes
  }
}

export const nodesFetchData = function(url) {
  return (dispatch) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(listOfNodes => {
        dispatch(nodesFetchDataSuccess(listOfNodes));
      });
  };
};

export function updateCurrentNode(nodeIdx) {
  return {
    type: UPDATE_CURRENT_NODE,
    payload: nodeIdx
  }
}
