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
<<<<<<< Updated upstream
=======
import DocumentStorage from "../pages/DocumentStorage";
import ProfilePersonal from "../pages/ProfilePersonal";
import PersonalTeacher from "../pages/PersonalTeacher";
import SearchUser from "../pages/SearchUser";
>>>>>>> Stashed changes

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
        { path: "/document/profilepersonal", element: <ProfilePersonal /> },
        {
          path: "/document/profilepersonalteacher",
          element: <PersonalTeacher />,
        },
        {
          path: "/document/searchuser",
          element: <SearchUser />,
        },
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
