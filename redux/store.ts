import { applyMiddleware, combineReducers, compose, createStore, } from 'redux';
import reduxThunk from 'redux-thunk';

import { reducerRegistry } from './reducer-registry';

import './user';
import './site-menu';

const configureStoreEnhancers = () => {
  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof window !== 'undefined') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
    }
  }

  const enhancers = composeEnhancers(
    applyMiddleware(reduxThunk),
  );

  return enhancers;
};

const configureStore = (initialState?: object) => {

  let header = (state = {}, action) => {

    let newState = { ...state };

    switch (action.type) {
      case 'HEADER_LOADING': {
        newState.loading = action.payload;
        break;
      }
      case 'HEADER_STATUS': {
        newState.alarms = action.headerStatus?.alarms;
        newState.mqttAddress = action.headerStatus?.mqttAddress;
        newState.mqttStatus = action.headerStatus?.mqttStatus;
        newState.countDevices = action.headerStatus?.countDevices;
        newState.systemInformation = action.headerStatus?.systemInformation;
        newState.appServerCheck = action.headerStatus?.appServerCheck;
        break;
      }
      default:
        break;
    }

    let out = { ...newState };
    return out;
  }

  let userInfo = (state = {}, action) => {

    let newState = { ...state };

    switch (action.type) {
      case 'SET_USER_INFO': {

        //newState.userInfo = action.payload;
        newState = action.payload;
        break;
      }
      default:
        break;
    }

    let out = { ...newState };
    return out;
  }


  let menuItems = (state = {}, action) => {

    let newState = { ...state };

    switch (action.type) {
      case 'MENU_ITEMS': {
        newState.menuItems = action.payload;
        break;
      }
      default:
        break;
    }

    let out = { ...newState };
    return out;
  }

  const registeredReducers = reducerRegistry.getCombinedReducers(initialState);
  const reducers = combineReducers({
    ...registeredReducers,
    header,
    userInfo,
    menuItems,
  });

  const enhancers = configureStoreEnhancers();

  const store = createStore(
    reducers,
    initialState,
    enhancers,
  );

  reducerRegistry.setChangeListener(() => {
    store.replaceReducer(
      combineReducers(reducerRegistry.getCombinedReducers()),
    );
  });

  return store;
};

export default configureStore;
