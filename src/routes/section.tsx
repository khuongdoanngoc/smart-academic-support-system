import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import DocumentPage from "../pages/Document";
import { DocumentLayout } from "../components/DocumentLayout";
import SupportPage from "../pages/Support";
import Login from "../pages/Login";
import ForgotPassWord from "../pages/ForgotPassWord";
import {ProfileAuthor, ChangePassWord, Register, UploadFile } from "../pages";
import NewPassword from "../pages/NewPassword";
import AISupportPage from "../pages/AISupport";
import EditProfile from "../pages/EditProfile";
import Notication from "../pages/Notication";
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
        { path: "/forgot-password", element: <ForgotPassWord />, index: true },
        { path: "/new-password", element: <NewPassword />, index: true },
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
        { path: "/document/notication", element: <Notication />, index: true },
      ],
    },
  ]);
  return routes;
}
