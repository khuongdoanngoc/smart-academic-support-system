import { Helmet } from "react-helmet-async";
import { CreateFolder } from "../sections/CreateFolder/view";

export default function CreateFolderPage() {
    return (
        <>
            <Helmet>
                <title>Create Folder</title>
            </Helmet>
            <CreateFolder />
        </>
    );
}
