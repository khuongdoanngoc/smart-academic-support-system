import classNames from "classnames/bind";
import styles from "./HeaderUploadFile.module.scss";

import Avatar from "../../../assets/images/avatar.png";

const cx = classNames.bind(styles);
type AvatarType = {
  profilePicture?: string; // Hoặc kiểu dữ liệu phù hợp, ví dụ: string | null
};

const HeaderUploadFile: React.FC<{ avatar: AvatarType }> = ({ avatar }) => {
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
            <img src={avatar?.profilePicture || Avatar} alt="avatar" />
          </a>
        </div>
      </div>
      <div className={cx("main-header-bottom")}>
        <h3>CẬP NHẬT TÀI LIỆU CỦA BẠN</h3>
      </div>
    </div>
  );
};

export default HeaderUploadFile;
