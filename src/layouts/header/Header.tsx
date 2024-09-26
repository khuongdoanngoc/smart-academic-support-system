import styles from "./Header.module.scss";
import classnames from "classnames/bind";
import VietnameseIcon from "../../assets/images/vietnamese.icon.png";
import Avatar from "../../assets/images/avatar.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const cx = classnames.bind(styles);
export default function Header() {
    return (
        <header>
            <div className={cx("header-top")}>
                <h1 className={cx("logo")}>
                    DT<span>FOR</span>YOU
                </h1>
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
            <div className={cx("header-bottom")}>
                <a href="#">TRANG CHỦ</a>
                <a href="#">GIỚI THIỆU</a>
                <a href="#">TÀI LIỆU</a>
                <a href="#">CÔNG CỤ AI</a>
                <a href="#">TIN TỨC</a>
                <a href="#">LIÊN HỆ</a>
                <button>
                    <SearchIcon />
                </button>
                <button>
                    <NotificationsNoneIcon />
                </button>
            </div>
        </header>
    );
}
