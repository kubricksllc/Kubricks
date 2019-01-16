import {
  SERVICES_FETCH,
  TOGGLE_SERVICE_TYPE,
  TOGGLE_SERVICE
} from "../actions/actionTypes.js";

const initialState = {
  listOfServices: [],
  serviceTypes: ["NodePort", "ClusterIP", "LoadBalancer", "Ingress"],
  activeServiceTypes: ["NodePort", "ClusterIP", "LoadBalancer", "Ingress"],
  activeServices: [],
  currentService: null
};

export function servicesReducer(state = initialState, action) {
  switch (action.type) {
    case SERVICES_FETCH:
      const activeServiceIndex = [];
      for (let i = 0; i < action.payload.length; i++) {
        activeServiceIndex.push(i);
      }
      return {
        ...state,
        listOfServices: action.payload,
        activeServices: activeServiceIndex
      };

    case TOGGLE_SERVICE_TYPE:
      let activeServiceTypes = [...state.activeServiceTypes];
      const serviceType = action.payload;
      const serviceTypeIndex = activeServiceTypes.indexOf(serviceType);
      if (serviceTypeIndex >= 0) {
        activeServiceTypes = activeServiceTypes
          .slice(0, serviceTypeIndex)
          .concat(
            activeServiceTypes.slice(
              serviceTypeIndex + 1,
              activeServiceTypes.length + 1
            )
          );
      } else activeServiceTypes = activeServiceTypes.concat(serviceType);

      const listOfServiceIndex = [];

      for(let i = 0;i < state.listOfServices.length;i++) {
        listOfServiceIndex.push(i);
      }
      
      return {
        ...state,
        activeServiceTypes,
        activeServices: listOfServiceIndex.filter(serviceIndex => {
          return activeServiceTypes.includes(state.listOfServices[serviceIndex].type);
        })
      };

    case TOGGLE_SERVICE:
      const serviceIndex = action.payload;
      let activeServices = [...state.activeServices];
      const activeIndex = activeServices.indexOf(serviceIndex);
      if (activeIndex >= 0) {
        activeServices = activeServices
          .slice(0, activeIndex)
          .concat(
            activeServices.slice(activeIndex + 1, activeServices.length + 1)
          );
      } else activeServices = activeServices.concat(serviceIndex);
      return { ...state, activeServices };

    default:
      return state;
  }
}
