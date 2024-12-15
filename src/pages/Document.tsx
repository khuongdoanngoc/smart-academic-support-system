import { Helmet } from "react-helmet-async";
import { DocumentView } from "../sections/Document/view";

export default function DocumentPage() {
  return (
    <>
      <Helmet>
        <title>Document</title>
      </Helmet>
      <DocumentView />
    </>
  );
}
