import { Helmet } from "react-helmet-async";
import { HomeView } from "../sections/Home/view";

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <HomeView />
        </>
    );
}
