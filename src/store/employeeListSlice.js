import { createSlice } from "@reduxjs/toolkit";

const employeeListSlice = createSlice({
  name: "employeeList",
  initialState: {
    employeeList: [],
  },
  reducers: {
    updateEmployeeList: (state, action) => {
        debugger;
        state.employeeList = action.payload;
    },
  },
});

export const { updateEmployeeList } = employeeListSlice.actions;
export default employeeListSlice.reducer;
