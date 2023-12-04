import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import About from "./components/About";
import Contact from "./components/Contact";
import Body from "./components/Body";
import "bootstrap/dist/css/bootstrap.css";
import EmployeeDetails from "./components/EmployeeDetails";
import { Provider } from "react-redux";
import store from "./store/store";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: <Error />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "empdetails/:id",
        element: <EmployeeDetails />,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
