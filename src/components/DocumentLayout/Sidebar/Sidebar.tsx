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

import CloseIcon from "../../../assets/images/icons/CloseArrowIcon.png";
import OpenIcon from "../../../assets/images/icons/OpenArrowIcon.png";

import ContactICON from "../../../assets/images/icons/ContactICON.png";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const menuItems = [
    { title: "Trang chủ", icon: HomeOutlinedIcon, pathAcitve: "/document" },
    { title: "Thư viện", icon: BookOutlinedIcon, pathAcitve: "#unknown" },
    { title: "Sách", icon: AutoStoriesOutlinedIcon, pathAcitve: "#unknown" },
];
const docItems = [
    {
        title: "Tài liệu",
        icon: InsertDriveFileOutlinedIcon,
        pathAcitve: "#unknown",
    },
    { title: "Môn học", icon: StickyNote2OutlinedIcon, pathAcitve: "#unknown" },
    {
        title: "Thông báo",
        icon: NotificationsOutlinedIcon,
        pathAcitve: "#unknown",
    },
];
const searchItems = [
    {
        title: "Phân loại",
        icon: SearchOutlinedIcon,
        pathAcitve: "#unknown",
    },
    {
        title: "Tài liệu đã lưu",
        icon: BookmarkAddedOutlinedIcon,
        pathAcitve: "#unknown",
    },
    {
        title: "Hỗ trợ AI",
        icon: SmartToyOutlinedIcon,
        pathAcitve: "/document/ai-support",
    },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const navigate = useNavigate();
    const pathName = useLocation().pathname;
    console.log(pathName);

    return (
        <div className={cx("sidebar", { open: isOpen, closed: !isOpen })}>
            <div className={cx("account")}>
                <img src={Avatar} alt="avatar" />
                {isOpen && (
                    <div>
                        <h3>Name user</h3>
                        <a href="#">+ Add information</a>
                    </div>
                )}
            </div>
            <div className={cx("statistics")}>
                <img
                    style={{ ...(!isOpen && { right: "-27.5px" }) }}
                    onClick={() => setIsOpen(!isOpen)}
                    src={isOpen ? CloseIcon : OpenIcon}
                    className={cx("toggle")}
                    alt="close-icon"
                />

                {isOpen && (
                    <div className={cx("statistics-in4")}>
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
                )}
            </div>
            <div
                className={cx("addDoc-btn")}
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/document/uploadfile");
                }}>
                <Button
                    text={`+ ${isOpen ? "Thêm mới" : ""}`}
                    paddingY={9.5}
                    paddingX={0}
                    fontSize={16}
                />
            </div>
            <div
                style={{ ...(!isOpen && { alignItems: "center" }) }}
                className={cx("items")}>
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        className={cx(pathName === item.pathAcitve && "active")}
                        href={item.pathAcitve}>
                        <item.icon sx={{ width: "22px", height: "22px" }} />
                        {isOpen && <h3>{item.title}</h3>}
                    </a>
                ))}
            </div>
            <div
                style={{ ...(!isOpen && { alignItems: "center" }) }}
                className={cx("items")}>
                <span style={{ ...(!isOpen && { visibility: "hidden" }) }}>
                    Tài liệu của tôi
                </span>
                {docItems.map((item, index) => (
                    <a
                        key={index}
                        className={cx(pathName === item.pathAcitve && "active")}
                        href={item.pathAcitve}>
                        <item.icon sx={{ width: "22px", height: "22px" }} />
                        {isOpen && <h3>{item.title}</h3>}
                    </a>
                ))}
            </div>
            <div
                style={{ ...(!isOpen && { alignItems: "center" }) }}
                className={cx("items")}>
                <span style={{ ...(!isOpen && { visibility: "hidden" }) }}>
                    Tìm kiếm nâng cao
                </span>
                {searchItems.map((item, index) => (
                    <a
                        key={index}
                        className={cx(pathName === item.pathAcitve && "active")}
                        href={item.pathAcitve}>
                        <item.icon sx={{ width: "22px", height: "22px" }} />
                        {isOpen && <h3>{item.title}</h3>}
                    </a>
                ))}
            </div>
            <button
                id={cx(pathName === "/document/support" && "support-active")}
                className={cx("support-btn")}
                onClick={() => {
                    navigate("/document/support");
                }}>
                <img src={ContactICON} alt="contact" />
                {isOpen && <span>Hỗ trợ 24/7</span>}
            </button>
        </div>
    );
}
