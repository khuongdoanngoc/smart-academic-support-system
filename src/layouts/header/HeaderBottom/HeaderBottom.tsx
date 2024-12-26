import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import styles from "./HeaderBottom.module.scss";
import classnames from "classnames/bind";
import { useState } from "react";
const cx = classnames.bind(styles);
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";


export default function HeaderBottom() {
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();

    const { isLogined } = useAppSelector((state) => state.authentication);

    const handleClick = () => {
        if (isLogined) {
            navigate("/document/notification");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className={cx("header-bottom")}>
            <a href="/">TRANG CHỦ</a>
            <Link to="introduction" smooth={true} duration={1000}>
                GIỚI THIỆU
            </Link>
            <a href="/document">TÀI LIỆU</a>
            <Link to="chatbot" smooth={true} duration={1000}>
                CÔNG CỤ AI
            </Link>
            <Link to="news" smooth={true} duration={1000}>
                TIN TỨC
            </Link>
            <Link to="contact" smooth={true} duration={1000}>
                LIÊN HỆ
            </Link>
            {/* <div className={cx("search-container")}>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onBlur={() => setSearchValue("")}
                    type="text"
                />
                <SearchIcon className={cx("search-icon")} />
            </div> */}
            <button onClick={handleClick}>
                <NotificationsNoneIcon />
            </button>
            
        </div>
    );
}
