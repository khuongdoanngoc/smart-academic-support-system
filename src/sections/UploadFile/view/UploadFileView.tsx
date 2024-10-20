import classNames from "classnames/bind";
import styles from "./UploadFileView.module.scss";
import { UploadFileComponents } from "../components";

const cx = classNames.bind(styles);
const UploadFileView = () => {
  return (
    <div className={cx("up-load-view")}>
      <UploadFileComponents />
    </div>
  );
};

export default UploadFileView;
