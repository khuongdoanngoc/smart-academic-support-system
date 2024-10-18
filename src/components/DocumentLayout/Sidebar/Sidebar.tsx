import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
import Avatar from "../../../assets/images/avatar.png";
import { Button } from "../../../components/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

import ContactICON from "../../../assets/images/icons/ContactICON.png";

import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const pathName = useLocation().pathname;
    const navigate = useNavigate();
    console.log(pathName);

    return (
        <div className={cx("sidebar")}>
            <div className={cx("account")}>
                <img src={Avatar} alt="avatar" />
                <div>
                    <h3>Name user</h3>
                    <a href="#">+ Add information</a>
                </div>
            </div>
            <div className={cx("statistics")}>
                <div>
                    <h3>0</h3>
                    <h4>Followers</h4>
                </div>
                <div>
                    <h3>0</h3>
                    <h4>Upload</h4>
                </div>
                <div>
                    <h3>0</h3>
                    <h4>Following</h4>
                </div>
            </div>
            <Button
                text="+ Thêm mới"
                paddingY={9.5}
                paddingX={0}
                fontSize={16}
            />
            <div className={cx("items")}>
                <a
                    className={cx(pathName === "/document" && "active")}
                    href="#">
                    <HomeOutlinedIcon sx={{ width: "22px", height: "22px" }} />
                    <h3>Trang chủ</h3>
                </a>
                <a href="#">
                    <BookOutlinedIcon sx={{ width: "22px", height: "22px" }} />
                    <h3>Thư viện</h3>
                </a>
                <a href="#">
                    <AutoStoriesOutlinedIcon
                        sx={{ width: "22px", height: "22px" }}
                    />
                    <h3>Sách</h3>
                </a>
            </div>
            <div className={cx("items")}>
                <span>Tài liệu của tôi</span>
                <a href="#">
                    <InsertDriveFileOutlinedIcon
                        sx={{ width: "22px", height: "22px" }}
                    />
                    <h3>Tài liệu</h3>
                </a>
                <a href="#">
                    <StickyNote2OutlinedIcon
                        sx={{ width: "22px", height: "22px" }}
                    />
                    <h3>Môn học</h3>
                </a>
                <a href="#">
                    <NotificationsOutlinedIcon
                        sx={{ width: "22px", height: "22px" }}
                    />
                    <h3>Thông báo</h3>
                </a>
            </div>
            <div className={cx("items")}>
                <span>Tìm kiếm nâng cao</span>
                <a href="#">
                    <SearchOutlinedIcon
                        sx={{ width: "22px", height: "22px" }}
                    />
                    <h3>Phân loại</h3>
                </a>
                <a href="#">
                    <BookmarkAddedOutlinedIcon
                        sx={{ width: "22px", height: "22px" }}
                    />
                    <h3>Đã lưu</h3>
                </a>
                <a href="#">
                    <SmartToyOutlinedIcon
                        sx={{ width: "22px", height: "22px" }}
                    />
                    <h3>Hỗ trợ AI</h3>
                </a>
            </div>
            <button
                id={cx(pathName === "/document/support" && "support-active")}
                className={cx("support-btn")}
                onClick={() => {
                    navigate("/document/support");
                }}>
                <img src={ContactICON} alt="contact" />
                <span>Hỗ trợ 24/7</span>
            </button>
        </div>
    );
}
