import { Helmet } from "react-helmet-async";
import { EditDocumentView } from "../sections/EditDocument/view";

const EditDocument = () => {
  return (
    <>
      <Helmet>
        <title>Edit Document</title>
      </Helmet>
      <EditDocumentView />
    </>
  );
};
export default EditDocument;
