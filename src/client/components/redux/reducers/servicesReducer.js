import {SERVICES_FETCH} from '../actions/actionTypes.js';

const initialState = {
  listOfServices: [],
  serviceTypes: ['NodePort', 'ClusterIP', 'LoadBalancer', 'Ingress'],
  activeServiceTypes: ['NodePort', 'ClusterIP', 'LoadBalancer', 'Ingress'],
  filteredServices: [],
  activeServices: [1, 0],
  currentService: null
}

export function servicesReducer (state = initialState, action) {
  switch(action.type) {
    case SERVICES_FETCH: {
      return {
        ...state,
        listOfServices: action.payload
      }
    }
    default:
      return state;
  }
} 
