import { createSlice } from '@reduxjs/toolkit'

export const redeemSlice = createSlice({
  name: 'redeem',
  initialState: {
    min_value: 0,
    max_value: 0,
  },
  reducers: {
    setRedeem: (state, action) => {
      state.min_value = action.payload.min_value;
      state.max_value = action.payload.max_value;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRedeem } = redeemSlice.actions;

export default redeemSlice.reducer;
