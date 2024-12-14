import { Helmet } from "react-helmet-async";
import { NotificationViews } from "../sections/Notification/view";

const Notification = () => {
  return (
    <>
      <Helmet>
        <title>Notification page</title>
      </Helmet>
      <NotificationViews />
    </>
  );
};

export default Notification;
