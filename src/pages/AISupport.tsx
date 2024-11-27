import { Helmet } from "react-helmet-async";
import { AISupportView } from "../sections/AISupport/view";

export default function AISupportPage() {
    return (
        <>
            <Helmet>
                <title>AI Support</title>
            </Helmet>
            <AISupportView />
        </>
    );
}
