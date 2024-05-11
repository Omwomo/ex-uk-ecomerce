import { combineReducers } from 'redux';
import appReducer from './slices'

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
