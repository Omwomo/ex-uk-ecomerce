import { combineReducers } from 'redux';
import appReducer from './slices'
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
