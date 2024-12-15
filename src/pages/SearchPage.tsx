import { Helmet } from "react-helmet-async";
import { SearchView } from "../sections/Search/view";

export default function SearchPage() {
    return (
        <>
            <Helmet>
                <title>Search</title>
            </Helmet>
            <SearchView />
        </>
    );
}
