import { SERVICES_FETCH, PODS_FETCH } from "./actionTypes.js";

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

function toggleServiceType(serviceType) {
  console.log(serviceType);
  return {};
};

const servicesAndPodsFetchData = function(url) {
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
};

export default servicesAndPodsFetchData;
