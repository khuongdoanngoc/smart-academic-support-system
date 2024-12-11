import { Helmet } from "react-helmet-async";
import { UsersView } from "../../sections/Admin/Users/view";

export default function AdminUsers() {
    return (
        <>
            <Helmet>
                <title>Admin Users</title>
            </Helmet>
            <UsersView />
        </>
    );
}
