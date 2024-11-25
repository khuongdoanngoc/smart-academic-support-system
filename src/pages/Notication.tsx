import { Helmet } from "react-helmet-async";
import { NoticationViews } from "../sections/Notication/view";

const Notication = () => {
  return (
    <>
      <Helmet>
        <title>Support</title>
      </Helmet>
      <NoticationViews />
    </>
  );
};

export default Notication;
