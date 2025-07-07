import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Feed from "./components/Feed";
import RestaurentPage from "./components/RestaurantPage";
import SignupCustomer from "./components/SignupCustomer";
import SignupRestaurant from "./components/SignupRestaurant";
import YourOrders from "./components/YourOrders";
import Dashboard from "./components/Dashboard";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup/customer",
        element: <SignupCustomer />,
      },
      {
        path: "/signup/restaurant",
        element: <SignupRestaurant />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/yourorders",
        element: <YourOrders />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/feed/view/:restaurantId",
        element: <RestaurentPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
