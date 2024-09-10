/* eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer'; // Adjust path as necessary
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const configureStore = createStore(
  rootReducer,
  applyMiddleware(logger) // Apply thunk and logger middleware
);

export type AppDispatch = typeof configureStore.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default configureStore;
