import { createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools()
  )
);

export default store;