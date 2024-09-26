import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import styles from "../Header.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
export default function HeaderBottom() {
    return (
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
    );
}
