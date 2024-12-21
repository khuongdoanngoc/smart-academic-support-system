import { Helmet } from "react-helmet-async";
import { CommingSoonView } from "../sections/CommingSoon/view";

const CommingSoonPage = () => {
  return (
    <>
      <Helmet>
        <title>Coming Soon</title>
      </Helmet>
      <CommingSoonView />
    </>
  );
};

export default CommingSoonPage;
