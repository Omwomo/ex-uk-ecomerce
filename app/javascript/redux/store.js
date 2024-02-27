import { configureStore } from '@reduxjs/toolkit';
import greetingReducer from './slices/greetingSlice';

const store = configureStore({
  reducer: {
    greeting: greetingReducer,
  },
});

export default store;
