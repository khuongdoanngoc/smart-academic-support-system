import styles from "../Header.module.scss";
import classnames from "classnames/bind";
import VietnameseIcon from "../../../assets/images/vietnamese.icon.png";
import Avatar from "../../../assets/images/avatar.png";
const cx = classnames.bind(styles);

export default function HeaderTop() {
    return (
        <div className={cx("header-top")}>
            <a href="/">
                <h1 className={cx("logo")}>
                    DT<span>FOR</span>YOU
                </h1>
            </a>
            <div className={cx("items")}>
                <div className={cx("language")}>
                    <img src={VietnameseIcon} alt="" />
                    <h3>Vietnamese</h3>
                </div>
                <button>SIGN-IN</button>
                <a href="#avatar">
                    <img src={Avatar} alt="avatar" />
                </a>
            </div>
        </div>
    );
}
