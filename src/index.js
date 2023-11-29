import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Body from "./components/Body";
import "bootstrap/dist/css/bootstrap.css";
import EmployeeDetails from "./components/EmployeeDetails";
import { Provider } from "react-redux";
import store from "./store/store";

const AppLayout = () => {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
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

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<RouterProvider router={appRouter} />);
