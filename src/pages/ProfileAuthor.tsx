import { Helmet } from "react-helmet-async";
import { ProfileAuthorView } from "../sections/ProfileAuthor/view";

const ProfileAuthor = () => {
  return (
    <>
      <Helmet>
        <title>Profile Author</title>
      </Helmet>
      <ProfileAuthorView />
    </>
  );
};
export default ProfileAuthor;
