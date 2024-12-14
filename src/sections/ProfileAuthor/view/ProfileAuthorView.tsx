// import { useParams } from "react-router-dom";
import { ProfileAuthorComponent } from "../components";

const ProfileAuthorView = () => {
  const userId = 3;
  return (
    <>
      <ProfileAuthorComponent userId={userId} />
    </>
  );
};

export default ProfileAuthorView;
