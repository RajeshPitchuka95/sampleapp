import { createSlice } from "@reduxjs/toolkit";

const selectedEmployeeSlice = createSlice({
  name: "selectedEmployee",
  initialState: {
    selectedEmployee: {},
  },
  reducers: {
    addEmployee: (state, action) => {
        state.selectedEmployee = action.payload;
    },
  },
});

export const { addEmployee } = selectedEmployeeSlice.actions;
export default selectedEmployeeSlice.reducer;
