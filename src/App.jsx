import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Feed from "./components/Feed";
import RestaurentPanel from "./components/restaurentPanel";

const Layout = () => {
  return (
    <>
      <Navbar />;
      <Outlet />;
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
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/restaurentPanel",
        element: <RestaurentPanel />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
