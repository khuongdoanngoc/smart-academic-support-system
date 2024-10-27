import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import DocumentPage from "../pages/Document";
import { DocumentLayout } from "../components/DocumentLayout";
import SupportPage from "../pages/Support";
import Login from "../pages/Login";
import ForgotPassWord from "../pages/ForgotPassWord";
import { ChangePassWord, Register, UploadFile } from "../pages";
import NewPassword from "../pages/NewPassword";
import AISupportPage from "../pages/AISupport";
import EditProfile from "../pages/EditProfile";

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
      ],
    },

    {
      element: (
        <DocumentLayout>
          <Outlet />
        </DocumentLayout>
      ),
      children: [
        { path: "/document", element: <DocumentPage /> },
        { path: "/document/directory", element: <DocumentPage /> },
        { path: "/document/support", element: <SupportPage /> },
        { path: "/document/ai-support", element: <AISupportPage /> },
        {
          path: "/document/uploadfile",
          element: <UploadFile />,
          index: true,
        },
        {
          path: "/document/changepassword",
          element: <ChangePassWord />,
          index: true,
        },
        {
          path: "/document/editprofile",
          element: <EditProfile />,
          index: true,
        },
      ],
    },
  ]);
  return routes;
}
