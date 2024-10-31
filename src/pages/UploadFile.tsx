import { FooterComponent } from "../layouts/footer/FooterComponent";
import { UploadFileView } from "../sections/UploadFile/view";

const UploadFile = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UploadFileView />
      <FooterComponent />
    </div>
  );
};

export default UploadFile;
