import { Helmet } from "react-helmet-async";
import { DetailDocumentView } from "../sections/DocumentDetail/view";

export default function DocumentDetailPage() {
    return (
        <>
            <Helmet>
                <title>Document Detail</title>
            </Helmet>
            <DetailDocumentView />
        </>
    );
}
