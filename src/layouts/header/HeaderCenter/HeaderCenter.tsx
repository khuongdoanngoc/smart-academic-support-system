import classNames from "classnames/bind";
import styles from "./HeaderCenter.module.scss";
const cx = classNames.bind(styles);

const HeaderCenter = () => {
  return (
    <div className={cx("header-center")}>
      <h3>DUY TAN UNIVERSITY</h3>
    </div>
  );
};

export default HeaderCenter;
