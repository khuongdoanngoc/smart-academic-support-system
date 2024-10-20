import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassWord from "../pages/ForgotPassWord";
import { Register, UploadFile } from "../pages";
import NewPassword from "../pages/NewPassword";

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: "/login", element: <Login />, index: true },
        { path: "/register", element: <Register />, index: true },
        { path: "/forgotpass", element: <ForgotPassWord />, index: true },
        { path: "/newpassword", element: <NewPassword />, index: true },
        { path: "/uploadfile", element: <UploadFile />, index: true },
      ],
    },
  ]);
  return routes;
}
