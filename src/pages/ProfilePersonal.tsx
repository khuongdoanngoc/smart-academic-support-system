import { Helmet } from "react-helmet-async";
import { ProfilePersonalView } from "../sections/ProfilePersonal/view";

const ProfilePersonal = () => {
  return (
    <>
      <Helmet>
        <title>Profile Personal</title>
      </Helmet>
      <ProfilePersonalView />
    </>
  );
};
export default ProfilePersonal;
