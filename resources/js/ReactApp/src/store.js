import { configureStore } from '@reduxjs/toolkit';
import loyaltyInfoReducer from './reducers/loyaltyInfoSlice';
import userReducer from './reducers/userSlice';
import loadingReducer from './reducers/loadingSlice';
import redeemReducer from './reducers/redeemSlice';

export default configureStore({
  reducer: {
      loading: loadingReducer,
      user: userReducer,
      loyaltyInfo: loyaltyInfoReducer,
      redeem: redeemReducer,
  },
});
