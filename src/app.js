import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
// import Grocery from "./components/Grocery";
import Error from "./components/Error";
import RestaurentMenu from "./components/RestaurentMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurent/:resId",
        element: <RestaurentMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading grocery...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);
//creating root
const root = ReactDOM.createRoot(document.getElementById("root"));

//rendering root
root.render(<RouterProvider router={appRouter} />);
