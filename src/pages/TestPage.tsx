import { Helmet } from "react-helmet-async";
import PdfViewer from "../sections/DocumentDetail/components/PdfViewer";

export default function TestPage() {
    return (
        <>
            <Helmet>
                <title>Test</title>
            </Helmet>
            <PdfViewer document="document.pdf" />
        </>
    );
}
