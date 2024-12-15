import classNames from "classnames/bind";
import styles from "./Loader.module.scss";

const cx= classNames.bind(styles);

type PropsType= {
    height: number|undefined;
}

const Loader = ({height}: PropsType) => {
  return (
    <div className={cx("main-login-load")} style={{height: `${height!==undefined&&height}%`}}>
      <div className={cx("login-load-item")}></div>
    </div>
  );
};

export default Loader;
