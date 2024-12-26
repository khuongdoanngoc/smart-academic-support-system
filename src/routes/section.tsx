import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import DocumentPage from "../pages/Document";
import { DocumentLayout } from "../components/DocumentLayout";
// import SupportPage from "../pages/Support";
// import FAQDetailPage from "../pages/FAQDetail";
import Login from "../pages/Login";
import ForgotPassWord from "../pages/ForgotPassWord";
import { ChangePassWord, ProfileAuthor, Register, UploadFile } from "../pages";
import NewPassword from "../pages/NewPassword";
import ProtectedRoute from "./ProtectedRoute";
import DocumentStorage from "../pages/DocumentStorage";
import ProfilePersonal from "../pages/ProfilePersonal";
import PersonalTeacher from "../pages/PersonalTeacher";
import SearchUser from "../pages/SearchUser";
import Notification from "../pages/Notification";
import EditProfile from "../pages/EditProfile";
import DocumentDetailPage from "../pages/DocumentDetail";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import AdminHome from "../pages/Admin/AdminHome";
import AdminDocumenPage from "../pages/Admin/AdminDocument";
import AdminUsers from "../pages/Admin/AdminUsers";
import CreateFolderPage from "../pages/CreateFolder";
import Directory from "../pages/Directory";
import SearchPage from "../pages/SearchPage";
import FolderDetailPage from "../pages/FolderDetail";
import AISupportPage from "../pages/AISupport";
import UserInformation from "../pages/Admin/UserInformation";
import CommingSoonPage from "../pages/CommingSoon";
import EditDocument from "../pages/EditDocument";
import FAQDetailPage from "../pages/FAQDetail";
import SupportPage from "../pages/Support";
export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: "login", element: <Login />, index: true },
        { path: "register", element: <Register />, index: true },
        {
          path: "forgot-password",
          element: <ForgotPassWord />,
        },
        { path: "new-password", element: <NewPassword />, index: true },
      ],
    },
    // {
    //   path: "/document",
    //   element: (
    //     <DocumentLayout>
    //       <Outlet />
    //     </DocumentLayout>
    //   ),
    //   children: [
    //     { path: "support", element: <SupportPage /> },
    //     { path: "support/:id", element: <FAQDetailPage /> },
    //     {
    //       path: "*",
    //       element: <Navigate to="/document/coming-soon" replace />,
    //     },
    //     {
    //       path: "coming-soon",
    //       element: <CommingSoonPage />,
    //       index: true,
    //     },
    //   ],
    // },
    {
      path: "/document",
      element: (
        <ProtectedRoute>
          <DocumentLayout>
            <Outlet />
          </DocumentLayout>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DocumentPage /> },
        { path: "directory", element: <Directory /> },
        // { path: "support", element: <SupportPage /> },
        { path: "ai-support", element: <AISupportPage /> },
        {
          path: "upload-file",
          element: <UploadFile />,
        },
        {
          path: "change-password",
          element: <ChangePassWord />,
        },
        {
          path: "edit-profile",
          element: <EditProfile />,
        },
        // {
        //   path: "edit-profile/:id",
        //   element: <EditProfile />,
        // },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          //   path: ":majorSlug/:folderSlug/id",
          path: ":id",
          element: <DocumentDetailPage />,
        },
        {
          path: "create-folder",
          element: <CreateFolderPage />,
        },
        {
          path: "folder/:id",
          element: <FolderDetailPage />,
        },
        // { path: "/directory", element: <DocumentPage /> },
        { path: "support", element: <SupportPage /> },
        { path: "support/:id", element: <FAQDetailPage /> },
        { path: "profile-author", element: <ProfileAuthor /> },
        { path: "profile-author/:lastName", element: <ProfileAuthor /> },
        { path: "profile-personal", element: <ProfilePersonal /> },
        {
          path: "profile-personal-teacher",
          element: <PersonalTeacher />,
        },
        // {
        //   path: "profile-personal-teacher:id",
        //   element: <PersonalTeacher />,
        // },
        {
          path: "search-user",
          element: <SearchUser />,
        },
        {
          path: "document-storage",
          element: <DocumentStorage />,
          index: true,
        },
        {
          path: "edit-document-file",
          element: <EditDocument />,
          index: true,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminHome />,
        },
        {
          path: "documents",
          element: <AdminDocumenPage />,
        },
        {
          path: "users",
          element: <AdminUsers />,
        },
        {
          path: "user-information",
          element: <UserInformation />,
        },
        {
          path: "user-information/:useId",
          element: <UserInformation />,
        },
      ],
    },
    {
      path: "/search",
      element: (
        <DocumentLayout>
          <Outlet />
        </DocumentLayout>
      ),
      children: [
        {
          element: <SearchPage />,
          index: true,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      path: "/404",
      element: <CommingSoonPage />,
      index: true,
    },
  ]);

  return routes;
}
