import classNames from "classnames/bind";
import styles from "./EditDocumentView.module.scss";
import { EditDocumentComponents } from "../components";

const cx = classNames.bind(styles);
const UploadFileView = () => {
  return (
    <div className={cx("up-load-view")}>
      <EditDocumentComponents />
    </div>
  );
};

export default UploadFileView;
