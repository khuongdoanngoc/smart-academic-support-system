import { Helmet } from "react-helmet-async";
import { FAQDetailView } from "../sections/FAQDetail/view";

const FAQDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ Support</title>
      </Helmet>
      <FAQDetailView />
    </>
  );
};

export default FAQDetailPage;
