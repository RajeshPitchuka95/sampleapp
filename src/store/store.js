import { configureStore } from "@reduxjs/toolkit";
import selectedEmployeeSlice from "./selectedEmployeeSlice";
import employeeListSlice from "./employeeListSlice";
const store = configureStore({
    reducer: {
        selectedEmployee: selectedEmployeeSlice,
        employeeList: employeeListSlice
    },
  });
  
  export default store;