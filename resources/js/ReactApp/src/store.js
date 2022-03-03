import { configureStore } from '@reduxjs/toolkit';
import loyaltyInfoReducer from './reducers/loyaltyInfoSlice';
import userReducer from './reducers/userSlice';

export default configureStore({
  reducer: {
      user: userReducer,
      loyaltyInfo: loyaltyInfoReducer
  },
});
