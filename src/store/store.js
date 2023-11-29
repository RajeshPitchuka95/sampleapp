import { configureStore } from "@reduxjs/toolkit";
import selectedEmployeeSlice from "./selectedEmployeeSlice";
const store = configureStore({
    reducer: {
        selectedEmployee: selectedEmployeeSlice
    },
  });
  
  export default store;