/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import DocumentPage from "../pages/Document";
import { DocumentLayout } from "../components/DocumentLayout";
import SupportPage from "../pages/Support";
import Login from "../pages/Login";
import ForgotPassWord from "../pages/ForgotPassWord";
import { ProfileAuthor, ChangePassWord, Register, UploadFile } from "../pages";
import NewPassword from "../pages/NewPassword";
import AISupportPage from "../pages/AISupport";
import EditProfile from "../pages/EditProfile";
import Notication from "../pages/Notication";
import ProtectedRoute from "./ProtectedRoute";
import DocumentDetailPage from "../pages/DocumentDetail";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import AdminHome from "../pages/Admin/AdminHome";
import AdminDocumenPage from "../pages/Admin/AdminDocument";
import AdminUsers from "../pages/Admin/AdminUsers";
import CreateFolderPage from "../pages/CreateFolder";

import Directory from "../pages/Directory";
import path from "path";
import SearchPage from "../pages/SearchPage";
import FolderDetailPage from "../pages/FolderDetail";

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
                { path: "support", element: <SupportPage /> },
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
                    path: "editprofile",
                    element: <EditProfile />,
                },
                {
                    path: "notication",
                    element: <Notication />,
                },
                {
                    path: ":majorSlug/:folderSlug/:id",
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
            ],
        },
        {
            path: "/admin",
            element: (
                <DashboardLayout>
                    <Outlet />
                </DashboardLayout>
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
    ]);
    return routes;
}
