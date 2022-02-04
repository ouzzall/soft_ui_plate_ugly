import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingSlice';

export default configureStore({
  reducer: {
      loading: loadingReducer
  },
});
