import { Helmet } from "react-helmet-async";
import { DirectoryView } from "../sections/Directory/view";

const Directory = () => {
  return (
    <>
      <Helmet>
        <title>directory</title>
      </Helmet>
      <DirectoryView />
    </>
  );
};

export default Directory;
