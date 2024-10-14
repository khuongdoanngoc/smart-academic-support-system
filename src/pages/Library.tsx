import { Helmet } from "react-helmet-async";
import { LibraryView } from "../sections/Library/view";


export default function LibraryPage() {
    return (
        <>
            <Helmet>
                <title>Library</title>
            </Helmet>
            <LibraryView />
        </>
    );
}
