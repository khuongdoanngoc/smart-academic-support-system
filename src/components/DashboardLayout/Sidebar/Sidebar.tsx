import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
import Avatar from "../../../assets/images/avatar.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CloseIcon from "../../../assets/images/icons/CloseArrowIcon.png";
import OpenIcon from "../../../assets/images/icons/OpenArrowIcon.png";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";

import { useLocation } from "react-router-dom";
import { useState } from "react";
const resourceItems = [
    {
        title: "Tài liệu",
        icon: InsertDriveFileOutlinedIcon,
        pathAcitve: "/admin/documents",
    },
    { title: "Môn học", icon: StickyNote2OutlinedIcon, pathAcitve: "#unknown" },
    {
        title: "Người dùng",
        icon: PermIdentityOutlinedIcon,
        pathAcitve: "/admin/users",
    },
    { title: "Thư viện", icon: BookOutlinedIcon, pathAcitve: "/admin/library" },
    {
        title: "Sách",
        icon: AutoStoriesOutlinedIcon,
        pathAcitve: "/admin/books",
    },
];
const supportItems = [
    {
        title: "Thông báo",
        icon: NotificationsOutlinedIcon,
        pathAcitve: "/admin/notifications",
    },
    {
        title: "Phân loại",
        icon: SearchOutlinedIcon,
        pathAcitve: "/admin/classify",
    },
    {
        title: "Báo cáo",
        icon: ReportGmailerrorredOutlinedIcon,
        pathAcitve: "/admin/reports",
    },
    {
        title: "Hỗ trợ AI",
        icon: SmartToyOutlinedIcon,
        pathAcitve: "/document/ai-support",
    },
];

const authorizationItems = [
    {
        title: "Quản trị viên",
        icon: AdminPanelSettingsOutlinedIcon,
        pathAcitve: "/admin/administrators",
    },
    {
        title: "Kiểm duyệt",
        icon: ChecklistRtlOutlinedIcon,
        pathAcitve: "/admin/censor",
    },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const pathName = useLocation().pathname;

    return (
        <div className={cx("sidebar", { open: isOpen, closed: !isOpen })}>
            <div className={cx("account")}>
                <img src={Avatar} alt="avatar" />
                {isOpen && (
                    <div>
                        <h3>Name user</h3>
                        <span>Admin</span>
                    </div>
                )}
            </div>
            <div className={cx("items")}>
                <a
                    href="/admin/dashboard"
                    className={cx(pathName === "/admin/dashboard" && "active")}>
                    <HomeOutlinedIcon
                        style={{ width: "22px", height: "22px" }}
                    />
                    {isOpen && <h3>Trang chủ</h3>}
                </a>
            </div>

            <img
                style={{ ...(!isOpen && { right: "-27.5px" }) }}
                onClick={() => setIsOpen(!isOpen)}
                src={isOpen ? CloseIcon : OpenIcon}
                className={cx("toggle")}
                alt="close-icon"
            />

            <div
                style={{ ...(!isOpen && { alignItems: "center" }) }}
                className={cx("items")}>
                <span style={{ ...(!isOpen && { visibility: "hidden" }) }}>
                    Quản lý tài nguyên
                </span>
                {resourceItems.map((item, index) => (
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
                    Thiết lập hỗ trợ
                </span>
                {supportItems.map((item, index) => (
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
                    Phân quyền
                </span>
                {authorizationItems.map((item, index) => (
                    <a
                        key={index}
                        className={cx(pathName === item.pathAcitve && "active")}
                        href={item.pathAcitve}>
                        <item.icon sx={{ width: "22px", height: "22px" }} />
                        {isOpen && <h3>{item.title}</h3>}
                    </a>
                ))}
            </div>
        </div>
    );
}
