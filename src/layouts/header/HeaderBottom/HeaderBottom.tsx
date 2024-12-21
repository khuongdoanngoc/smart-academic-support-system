import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import styles from "./HeaderBottom.module.scss";
import classnames from "classnames/bind";
import { useState } from "react";
const cx = classnames.bind(styles);
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AvatarIMG from "../../../assets/images/avatar.png";
import { truncateText } from "../../../utils/truncateText";
import { Link } from 'react-scroll';
const notificationsData = [
    {
        title: "Tiêu đề thông báo...Tiêu đề thông báo...Tiêu đề thông báo...",
        checked: true,
    },
    {
        title: "Tiêu đề thông báo...Tiêu đề thông báo...Tiêu đề thông báo...",
        checked: true,
    },
    {
        title: "Tiêu đề thông báo...Tiêu đề thông báo...Tiêu đề thông báo...",
        checked: true,
    },
    {
        title: "Tiêu đề thông báo...Tiêu đề thông báo...Tiêu đề thông báo...",
        checked: true,
    },
    {
        title: "Tiêu đề thông báo...Tiêu đề thông báo...Tiêu đề thông báo...",
        checked: true,
    },
];

export default function HeaderBottom() {
    const [searchValue, setSearchValue] = useState<string>("");

    // popover configs
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div className={cx("header-bottom")}>
            <a href="/">TRANG CHỦ</a>
            <Link to="introduction" smooth={true} duration={1000}>GIỚI THIỆU</Link>
            <a href="/document">TÀI LIỆU</a> 
            <Link to="chatbot" smooth={true} duration={1000}>CÔNG CỤ AI</Link>
            <Link to="news" smooth={true} duration={1000}>TIN TỨC</Link>
            <Link to="contact" smooth={true} duration={1000}>LIÊN HỆ</Link>
            <div className={cx("search-container")}>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onBlur={() => setSearchValue("")}
                    type="text"
                />
                <SearchIcon className={cx("search-icon")} />
            </div>
            <button onClick={handleClick}>
                <NotificationsNoneIcon />
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}>
                <div className={cx("popover-content")}>
                    <div className={cx("popover-header")}>
                        <h1>Thông báo</h1>
                        <MoreHorizIcon />
                    </div>
                    <hr />
                    <div className={cx("popover-body")}>
                        <div className={cx("actions")}>
                            <span>Mới</span>
                            <a href="#">Xem tất cả</a>
                        </div>
                        <div className={cx("notifications")}>
                            {notificationsData.map((data, index) => (
                                <div className={cx("notify")} key={index}>
                                    <img src={AvatarIMG} alt="avt" />
                                    <p>{truncateText(data.title)}</p>
                                    {data.checked && <span />}
                                </div>
                            ))}
                        </div>
                        <button>Xem thông báo trước đó</button>
                    </div>
                </div>
            </Popover>
        </div>
    );
}
