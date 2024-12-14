import { Helmet } from "react-helmet-async";
import { FolderDetailView } from "../sections/FolderDetail/view";

export default function FolderDetailPage() {
    return (
        <>
            <Helmet>
                <title>Folder Detail</title>
            </Helmet>
            <FolderDetailView />
        </>
    );
}
