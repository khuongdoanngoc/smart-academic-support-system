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
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
export default function Sidebar() {
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
                text="+ Tải tài liệu mới"
                paddingY={9.5}
                paddingX={0}
                fontSize={16}
            />
            <div className={cx("items")}>
                <a className={cx("active")} href="#">
                    <HomeOutlinedIcon sx={{ width: "40px", height: "40px" }} />
                    <h3>Trang chủ</h3>
                </a>
                <a href="#">
                    <BookOutlinedIcon sx={{ width: "40px", height: "40px" }} />
                    <h3>Thư viện</h3>
                </a>
                <a href="#">
                    <AutoStoriesOutlinedIcon
                        sx={{ width: "40px", height: "40px" }}
                    />
                    <h3>Sách</h3>
                </a>
            </div>
            <div className={cx("items")}>
                <span>Tài liệu của tôi</span>
                <a href="#">
                    <InsertDriveFileOutlinedIcon
                        sx={{ width: "40px", height: "40px" }}
                    />
                    <h3>Tài liệu</h3>
                </a>
                <a href="#">
                    <StickyNote2OutlinedIcon
                        sx={{ width: "40px", height: "40px" }}
                    />
                    <h3>Môn học</h3>
                </a>
                <a href="#">
                    <FolderOutlinedIcon
                        sx={{ width: "40px", height: "40px" }}
                    />
                    <h3>Thư mục</h3>
                </a>
            </div>
            <div className={cx("items")}>
                <span>Tìm kiếm thông minh</span>
                <a href="#">
                    <SearchOutlinedIcon
                        sx={{ width: "40px", height: "40px" }}
                    />
                    <h3>Phân loại</h3>
                </a>
                <a href="#">
                    <BookmarkAddedOutlinedIcon
                        sx={{ width: "40px", height: "40px" }}
                    />
                    <h3>Đã lưu</h3>
                </a>
                <a href="#">
                    <TagOutlinedIcon sx={{ width: "40px", height: "40px" }} />
                    <h3>Gắn thẻ</h3>
                </a>
            </div>
        </div>
    );
}
