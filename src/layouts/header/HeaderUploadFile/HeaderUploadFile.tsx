import classNames from "classnames/bind";
import styles from "./HeaderUploadFile.module.scss";

import Avatar from "../../../assets/images/avatar.png";

const cx = classNames.bind(styles);

const HeaderUploadFile = () => {
  return (
    <div className={cx("component-main-header")}>
      <div className={cx("main-header-top")}>
        <div className={cx("main-header-left")}></div>
        <div className={cx("main-header-body")}>
          <a href="/">
            <h1 className={cx("logo")}>
              DT<span>FOR</span>YOU
            </h1>
          </a>
        </div>
        <div className={cx("main-header-right")}>
          <a href="#avatar">
            <img src={Avatar} alt="avatar" />
          </a>
        </div>
      </div>
      <div className={cx("main-header-bottom")}>
        <h3>TẢI LÊN TÀI LIỆU CỦA BẠN</h3>
      </div>
    </div>
  );
};

export default HeaderUploadFile;
