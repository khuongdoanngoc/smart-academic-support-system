import { Helmet } from "react-helmet-async";
import { AdminHomeView } from "../../sections/Admin/AdminHome/view";

export default function AdminHome() {
    return (
        <>
            <Helmet>
                <title>Admin Home</title>
            </Helmet>
            <AdminHomeView />
        </>
    );
}
