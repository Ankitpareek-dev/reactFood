import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
