import { Helmet } from "react-helmet-async";
import { DocumentsView } from "../../sections/Admin/Documents/view";

export default function AdminDocumenPage() {
    return (
        <>
            <Helmet>
                <title>Document</title>
            </Helmet>
            <DocumentsView />
        </>
    );
}
