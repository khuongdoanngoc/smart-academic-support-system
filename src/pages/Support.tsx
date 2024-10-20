import { Helmet } from "react-helmet-async";
import { SupportView } from "../sections/Support/view";

export default function SupportPage() {
    return (
        <>
            <Helmet>
                <title>Support</title>
            </Helmet>
            <SupportView />
        </>
    );
}
