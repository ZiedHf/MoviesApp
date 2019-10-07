import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

function configureStore() {
  const middleware = [thunk];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    // initialState, from argument
    composeEnhancers(applyMiddleware(...middleware)),
  );

  return store;
}

const store = configureStore({});
export default store;
