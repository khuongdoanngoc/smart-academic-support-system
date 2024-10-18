import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import DocumentPage from "../pages/Document";
import { DocumentLayout } from "../components/DocumentLayout";
import SupportPage from "../pages/Support";

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <Layout>
                    <Outlet />
                </Layout>
            ),
            children: [{ element: <HomePage />, index: true }],
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
            ],
        },
    ]);
    return routes;
}
