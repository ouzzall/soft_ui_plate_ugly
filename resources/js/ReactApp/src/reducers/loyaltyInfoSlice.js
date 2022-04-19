import { createSlice } from '@reduxjs/toolkit'

export const loyaltyInfoSlice = createSlice({
  name: 'loyaltyInfo',
  initialState: {
    coupon: 'XXXXXXXX',
    points: 0,
    expiry: '',
  },
  reducers: {
    setLoyaltyInfo: (state, action) => {
      state.coupon = action.payload.coupon;
      state.points = action.payload.points;
      state.expiry = action.payload.expiry;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoyaltyInfo } = loyaltyInfoSlice.actions;

export default loyaltyInfoSlice.reducer;
