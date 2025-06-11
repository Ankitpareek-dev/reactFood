import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import { createBrowserRouter, RouterProvider } from "react-router";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    Element: <AppLayout></AppLayout>,
  },
  {
    path: "/about",
    element: <About></About>,
  },
]);
//creating root
const root = ReactDOM.createRoot(document.getElementById("root"));

//rendering root
root.render(<AppLayout />);
