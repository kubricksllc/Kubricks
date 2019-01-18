import { SERVICES_FETCH, PODS_FETCH, TOGGLE_SERVICE } from "./actionTypes.js";
import { TOGGLE_SERVICE_TYPE } from "./actionTypes.js";

function servicesFetch(listOfServices) {
  return {
    type: SERVICES_FETCH,
    payload: listOfServices
  };
}

function podsFetch(listOfPods) {
  return {
    type: PODS_FETCH,
    payload: listOfPods
  };
}

export function toggleServiceType(serviceType) {
  return {
    type: TOGGLE_SERVICE_TYPE,
    payload: serviceType
  };
}

export function toggleService(serviceIndex) {
  return {
    type: TOGGLE_SERVICE,
    payload: serviceIndex
  };
}

export function servicesAndPodsFetchData(url) {
  return dispatch => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then(data => {
        console.log("hitting response", data);
        dispatch(servicesFetch(data.services));
        dispatch(podsFetch(data.pods));
      })
      .catch(err => console.log(err));
  };
}
