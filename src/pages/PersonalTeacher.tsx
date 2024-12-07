import { Helmet } from "react-helmet-async";
import PersonalTeacherView from "../sections/ProfilePersonalTeacher/view/PersonalTeacherView";

const PersonalTeacher = () => {
  return (
    <>
      <Helmet>
        <title>Profile Personal Teacher</title>
      </Helmet>
      <PersonalTeacherView />
    </>
  );
};
export default PersonalTeacher;
