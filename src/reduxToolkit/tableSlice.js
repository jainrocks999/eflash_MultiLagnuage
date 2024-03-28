import {createSlice} from '@reduxjs/toolkit';

const TableSlice = createSlice({
  name: 'userData',
  initialState: 'tbl_items',
  reducers: {
    Table(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const {Table} = TableSlice.actions;
export default TableSlice.reducer;
