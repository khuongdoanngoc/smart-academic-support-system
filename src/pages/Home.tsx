import { Helmet } from "react-helmet-async";
import { HomeView } from "../sections/Home/view";
// import { Header } from "../layouts/header";

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
