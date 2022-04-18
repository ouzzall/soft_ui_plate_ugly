import { createSlice } from '@reduxjs/toolkit'

export const loyaltyInfoSlice = createSlice({
  name: 'loyaltyInfo',
  initialState: {
    coupon: 'XXXXXXXX',
    points: 0,
    radeemable: 0,
    expiry: '',
  },
  reducers: {
    setLoyaltyInfo: (state, action) => {
      state.coupon = action.payload.coupon;
      state.points = action.payload.points;
      state.radeemable = action.payload.radeemable;
      state.expiry = action.payload.expiry;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoyaltyInfo } = loyaltyInfoSlice.actions;

export default loyaltyInfoSlice.reducer;
