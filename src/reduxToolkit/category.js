import {createSlice} from '@reduxjs/toolkit';

const initialState = [];
const cateSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addCat(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const {addCat} = cateSlice.actions;
export default cateSlice.reducer;
