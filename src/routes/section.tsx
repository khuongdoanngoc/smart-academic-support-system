import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";
import LibraryPage from "../pages/Library";
import { DocumentLayout } from "../components/DocumentLayout";

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
            children: [{ path: "/library", element: <LibraryPage /> }],
        },
    ]);
    return routes;
}
