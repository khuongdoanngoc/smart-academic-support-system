import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/Home";

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
    ]);
    return routes;
}
