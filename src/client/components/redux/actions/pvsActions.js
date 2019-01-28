import { PVS_FETCH } from "./actionTypes.js";

function pvFetchResult(listofPVs) {
  return {
    type: PVS_FETCH,
    payload: listofPVs
  };
}

export function pvFetchData(url) {
  return dispatch => {
    fetch(url)
      .then(result => result.json())
      .then(result => dispatch(pvFetchResult(result)))
      .catch(err => console.log(err));
  };
}
