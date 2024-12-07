import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import DocumentPage from "../pages/Document";
import { DocumentLayout } from "../components/DocumentLayout";
import SupportPage from "../pages/Support";
import Login from "../pages/Login";
import ForgotPassWord from "../pages/ForgotPassWord";
import { ProfileAuthor, Register, UploadFile } from "../pages";
import NewPassword from "../pages/NewPassword";
import ProtectedRoute from "./ProtectedRoute";

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
        <ProtectedRoute>
          <DocumentLayout>
            <Outlet />
          </DocumentLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/document",
          element: <DocumentPage />,
        },
        { path: "/document/directory", element: <DocumentPage /> },
        { path: "/document/support", element: <SupportPage /> },
        { path: "/document/profileauthor", element: <ProfileAuthor /> },
        { path: "/document/uploadfile", element: <UploadFile />, index: true },
        {
          path: "/document/documentstorage",
          element: <DocumentStorage />,
          index: true,
        },
        { path: "/document/notication", element: <Notication />, index: true },
      ],
    },
  ]);
  return routes;
}
