/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
import Avatar from "../../../assets/images/avatar.png";
import { Button } from "../../../components/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

import CloseIcon from "../../../assets/images/icons/CloseArrowIcon.png";
import OpenIcon from "../../../assets/images/icons/OpenArrowIcon.png";

import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ContactICON from "../../../assets/images/icons/ContactICON.png";
import Badge from "@mui/material/Badge";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RootState, useAppSelector } from "../../../redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { appear } from "../../../utils/animations";
import { useSelector } from "react-redux";

const menuItems = [
  { title: "Trang chủ", icon: HomeOutlinedIcon, pathAcitve: "/document" },
  { title: "Thư viện", icon: BookOutlinedIcon, pathAcitve: "/404" },
  { title: "Sách", icon: AutoStoriesOutlinedIcon, pathAcitve: "/404" },
];
const docItems = [
  {
    title: "Tài liệu",
    icon: InsertDriveFileOutlinedIcon,
    regex: /^\/document\/(directory|folder)/,
    linkTo: "/document/directory",
  },
  {
    title: "Môn học",
    icon: StickyNote2OutlinedIcon,
    regex: /^\/document\/(subject)/,
    linkTo: "/404",
  },
  {
    title: "Thông báo",
    icon: NotificationsOutlinedIcon,
    regex: /^\/document\/(notication)/,
    linkTo: "/document/notification",
  },
];
const searchItems = [
  {
    title: "Người dùng",
    icon: PersonSearchOutlinedIcon,
    pathAcitve: "/document/search-user",
  },
  {
    title: "Tài liệu đã lưu",
    icon: BookmarkAddedOutlinedIcon,
    pathAcitve: "/document/document-storage",
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
  
  const { numberOfNotificationsUnRead } = useAppSelector(
    (state) => state.notication
  );
  const isOpenAndModal = isModal && isOpen;

  const handleClickUpFIle = () => {
    navigate("/document/upload-file");
  };
  const handleClickProfile = () => {
    navigate("/document/profile-personal");
  };

  const uploadFileDropdown = (
    <AnimatePresence>
      {dropdownToggle && (
        <motion.div
          variants={customAppear}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cx("uploadfile-dropdown")}
        >
          <div className={cx("item")} onClick={handleClickUpFIle}>
            <UploadFileIcon sx={{ width: "22px", height: "22px" }} />
            {isOpen && <span>Tải tài liệu</span>}
          </div>
          <hr />
          <div
            className={cx("item")}
            onClick={() => navigate("/document/create-folder")}
          >
            <CreateNewFolderOutlinedIcon
              sx={{ width: "22px", height: "22px" }}
            />
            {isOpen && <span>Tạo thư mục</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  const ilogins = useSelector(
    (state: RootState) => state.authentication.ilogins
  );
  console.log(ilogins);
  
  return (
    <div
      style={isOpenAndModal ? { position: "fixed" } : {}}
      className={cx("sidebar", { open: isOpen, closed: !isOpen })}
    >
      <div className={cx("account")}>
        <img src={ilogins?.profilePicture || Avatar} alt="avatar" />
        {isOpen && (
          <div>
            <h3 onClick={handleClickProfile}>
              {username ? username : "Name User"}
            </h3>
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
              <h3>{ilogins?.follower || 0}</h3>
              <h4>Followers</h4>
            </div>
            <div>
              <h3>{ilogins?.upload || 0}</h3>
              <h4>Upload</h4>
            </div>
            <div>
              <h3>{ilogins?.following || 0}</h3>
              <h4>Following</h4>
            </div>
          </div>
        )}
      </div>
      <div
        className={cx("addDoc-btn")}
        onClick={(e) => {
          e.preventDefault();
          setDropdownToggle((prevDropdownToggle) => !prevDropdownToggle);
        }}
      >
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
        className={cx("items")}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            className={cx(pathName === item.pathAcitve && "active")}
            to={item.pathAcitve}
          >
            <item.icon sx={{ width: "22px", height: "22px" }} />
            {isOpen && <h3>{item.title}</h3>}
          </Link>
        ))}
      </div>
      <div
        style={{ ...(!isOpen && { alignItems: "center" }) }}
        className={cx("items")}
      >
        <span style={{ ...(!isOpen && { visibility: "hidden" }) }}>
          Tài liệu của tôi
        </span>
        {docItems.map((item, index) => (
          <Link
            key={index}
            className={cx(
              pathName === item.linkTo && "active",
              `${
                item.linkTo === "/document/notification" &&
                numberOfNotificationsUnRead > 0
                  ? "brings"
                  : ""
              }`
            )}
            to={item.linkTo}
          >
            {item.linkTo === "/document/notification" ? (
              <Badge
                badgeContent={
                  numberOfNotificationsUnRead > 0
                    ? numberOfNotificationsUnRead
                    : 0
                }
                color="error"
              >
                <item.icon sx={{ width: "22px", height: "22px" }} />
              </Badge>
            ) : (
              <item.icon sx={{ width: "22px", height: "22px" }} />
            )}

            {isOpen && <h3>{item.title}</h3>}
          </Link>
        ))}
      </div>
      <div
        style={{ ...(!isOpen && { alignItems: "center" }) }}
        className={cx("items")}
      >
        <span style={{ ...(!isOpen && { visibility: "hidden" }) }}>
          Tìm kiếm nâng cao
        </span>
        {searchItems.map((item, index) => (
          <Link
            key={index}
            className={cx(pathName === item.pathAcitve && "active")}
            to={item.pathAcitve}
          >
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
        }}
      >
        <img src={ContactICON} alt="contact" />
        {isOpen && <span>Hỗ trợ 24/7</span>}
      </button>
    </div>
  );
}
