import { Helmet } from "react-helmet-async";
import UsersInformationViews from "../../sections/Admin/UsersInformation/views/UsersInformationViews";

const UserInformation = () => {
  return (
    <>
      <Helmet>
        <title>user information</title>
      </Helmet>
      <UsersInformationViews />
    </>
  );
};
export default UserInformation;
