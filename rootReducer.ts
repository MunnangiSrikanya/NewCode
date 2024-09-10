import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  token: tokenReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
