import { PVS_FETCH, UPDATE_CURRENT_PV } from "./actionTypes.js";

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

export function updateCurrentPV(pvIdx) {
  return {
    type: UPDATE_CURRENT_PV,
    payload: pvIdx
  };
}
