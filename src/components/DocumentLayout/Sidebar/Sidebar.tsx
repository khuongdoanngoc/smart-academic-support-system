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

import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ContactICON from "../../../assets/images/icons/ContactICON.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { appear } from "../../../utils/animations";

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
        pathAcitve: "/document/notication",
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

interface ISidebar {
    isModal: boolean;
    isOpen: boolean;
    setIsOpen: any;
}

const customAppear = {
    ...appear,
    hidden: {
        ...appear.hidden,
        transition: { ...appear.hidden.transition, duration: 0 },
    },
};

export default function Sidebar({ isModal, isOpen, setIsOpen }: ISidebar) {
    const navigate = useNavigate();
    const pathName = useLocation().pathname;
    const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
    const { username } = useAppSelector((state) => state.authentication);
    const isOpenAndModal = isModal && isOpen;

    const uploadFileDropdown = (
        <AnimatePresence>
            {dropdownToggle && (
                <motion.div
                    variants={customAppear}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={cx("uploadfile-dropdown")}>
                    <div className={cx("item")}>
                        <UploadFileIcon
                            sx={{ width: "22px", height: "22px" }}
                        />
                        {isOpen && <span>Tải tài liệu</span>}
                    </div>
                    <hr />
                    <div className={cx("item")}>
                        <CreateNewFolderOutlinedIcon
                            sx={{ width: "22px", height: "22px" }}
                        />
                        {isOpen && <span>Tạo thư mục</span>}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div
            style={isOpenAndModal ? { position: "fixed" } : {}}
            className={cx("sidebar", { open: isOpen, closed: !isOpen })}>
            <div className={cx("account")}>
                <img src={Avatar} alt="avatar" />
                {isOpen && (
                    <div>
                        <h3>{username?username:"Name User"}</h3>
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
                    setDropdownToggle(
                        (prevDropdownToggle) => !prevDropdownToggle
                    );
                }}>
                <Button
                    text={`+ ${isOpen ? "Thêm mới" : ""}`}
                    paddingY={9.5}
                    paddingX={0}
                    fontSize={16}
                />
            </div>
            {uploadFileDropdown}
            <div
                style={{ ...(!isOpen && { alignItems: "center" }) }}
                className={cx("items")}>
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        className={cx(pathName === item.pathAcitve && "active")}
                        to={item.pathAcitve}>
                        <item.icon sx={{ width: "22px", height: "22px" }} />
                        {isOpen && <h3>{item.title}</h3>}
                    </Link>
                ))}
            </div>
            <div
                style={{ ...(!isOpen && { alignItems: "center" }) }}
                className={cx("items")}>
                <span style={{ ...(!isOpen && { visibility: "hidden" }) }}>
                    Tài liệu của tôi
                </span>
                {docItems.map((item, index) => (
                    <Link
                        key={index}
                        className={cx(pathName === item.pathAcitve && "active")}
                        to={item.pathAcitve}>
                        <item.icon sx={{ width: "22px", height: "22px" }} />
                        {isOpen && <h3>{item.title}</h3>}
                    </Link>
                ))}
            </div>
            <div
                style={{ ...(!isOpen && { alignItems: "center" }) }}
                className={cx("items")}>
                <span style={{ ...(!isOpen && { visibility: "hidden" }) }}>
                    Tìm kiếm nâng cao
                </span>
                {searchItems.map((item, index) => (
                    <Link
                        key={index}
                        className={cx(pathName === item.pathAcitve && "active")}
                        to={item.pathAcitve}>
                        <item.icon sx={{ width: "22px", height: "22px" }} />
                        {isOpen && <h3>{item.title}</h3>}
                    </Link>
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
