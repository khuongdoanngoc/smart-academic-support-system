import { Helmet } from "react-helmet-async";
import { DocumentStorageView } from "../sections/DocumentStorage/view";

const DocumentStorage = () => {
  return (
    <>
      <Helmet>
        <title>Document Storage</title>
      </Helmet>
      <DocumentStorageView />
    </>
  );
};
export default DocumentStorage;
